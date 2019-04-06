from flask import Flask, request

app = Flask(__name__)

@app.route('/api/')
def index():
	return "sup"

'''


'''