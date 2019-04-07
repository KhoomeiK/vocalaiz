from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/prelim', methods=['POST'])
def index(word):
	print(request)
	print(request.files)
	rec = request.files['recording']

	#files = os.listdir("./")
	#file = files["%s.afp" % word]
	return True
