from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/prelim', methods=['POST'])
def index(word):
	print(request.form.to_dict(flat=False))

	#files = os.listdir("./")
	#file = files["%s.afp" % word]
	return "yeet"
	'''
	{
		word1: [0.921, CorrectPronouncedBlob1]
		word2: [0.394, blob2]
	}
	'''