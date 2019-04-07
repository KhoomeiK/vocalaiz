from flask import Flask, request
import os
import wave

app = Flask(__name__)

@app.route('/prelim', methods=['POST'])
def index(word):
	req = request.form.to_dict(flat=False)
	print(req)
	base = req.recording

	# save as wav locally
	testFile = wave.open('test.wav', 'wb')
	testFile.setparams((2, 2, 8000, 100, None, None))
	testFile.writeframes(base)
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