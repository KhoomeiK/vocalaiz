from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/prelim/<word>')
def index(word):
	files = os.listdir("./")
	file = files["%s.afp" % word]
	
	return True
