from flask import Flask, request
import os
import wave
import base64

app = Flask(__name__)

@app.route('/prelim', methods=['POST'])
def index():
	req = request.form.to_dict(flat=False)
	print(req)
	base = req['recording'][0] # must convert this to bytes
	binBase = base64.b64decode(base)
	print(binBase)

	# save as wav locally
	testFile = wave.open('test.wav', 'wb')
	testFile.setparams((2, 2, 25000, 100, 'NONE', None))
	testFile.writeframes(binBase)
	# send to gcloud api
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
