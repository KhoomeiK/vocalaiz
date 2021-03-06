from flask import Flask, request, jsonify
import os
import wave
import base64
import subprocess
import random
from MatadorHashing import fingerprintComparator

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
	testFile.setparams((1, 2, 44100, 100, 'NONE', None))
	testFile.writeframes(binBase)
	# send to gcloud api
	proc = subprocess.Popen(['node', 'gcloudTest.js'], stdout=subprocess.PIPE)
	print(proc.stdout)
	sects = proc.stdout.readlines()
	print(sects)
	resp = {'data': []}
	for line in sects:
		line = line.decode('ascii')
		name = line.split(':')[0]
		start = float(line.split(':')[1].split('-')[0])
		end = float(line.split(':')[1].split('-')[1])
		print('%s %s %s' % (name, start, end))
		os.system("ffmpeg -i test.wav -ss %s -to %s -c copy audio/user/%s.wav" % (start, end, name))
		num = fingerprintComparator(name, "audio/user/%s.wav" % name)
		resp['data'].append([name, num])
		# resp['data'].append([name, random.uniform(0, 1)])
	return jsonify(resp)

'''
{[
	[word1, 0.921, CorrectPronouncedBlob1]
	[word2, 0.394, blob2]
]}
'''
