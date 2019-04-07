from flask import Flask, request
import os
import wave
import base64
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

app = Flask(__name__)

@app.route('/prelim', methods=['POST'])
def index():
	req = request.form.to_dict(flat=False)
	# print(req)
	base = req['recording'][0] # must convert this to bytes
	binBase = base64.b64decode(base)
	# print(binBase)

	# save as wav locally
	testFile = wave.open('test.wav', 'wb')
	testFile.setparams((2, 2, 22000, 100, 'NONE', None))
	testFile.writeframes(binBase)
	# send to gcloud api

	# Instantiates a client
	client = speech.SpeechClient()

	# Loads the audio into memory
	with io.open('test.wav', 'rb') as audio_file:
	    content = audio_file.read()
	    audio = types.RecognitionAudio(content=content)

	config = types.RecognitionConfig(
	    encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
	    sample_rate_hertz=16000,
	    language_code='en-US')

	# Detects speech in the audio file
	response = client.recognize(config, audio)

	for result in response.results:
	    print('Transcript: {}'.format(result.alternatives[0].transcript))

	# splice wav into word files
	# pass word files to fingerprinter
	# create json and send back to client

	#files = os.listdir("./")
	#file = files["%s.afp" % word]
	return "yeet"

'''
{[
	[word1, 0.921, CorrectPronouncedBlob1]
	[word2, 0.394, blob2]
]}
'''
