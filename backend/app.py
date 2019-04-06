from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/prelim/<word>')
def index(word):
	# files = os.listdir("./")
	for file in os.listdir("./hashes"):
	    if file == "%s.afp" % word: # Audio Finger Print
	        filepath = os.path.join("~/hashes", file)
	return "sup"