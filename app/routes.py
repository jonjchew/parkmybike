import requests, json
from flask import render_template, request, jsonify
from app import app
from helpers import find_spots

@app.route('/', methods = ['GET', 'POST'])
def index():
	if request.method == 'POST':
		latitude = float(request.form['latitude'])
		longitude = float(request.form['longitude'])
		origin = [latitude, longitude]

		response = requests.get("http://data.sfgov.org/resource/w969-5mn4.json")
		all_spots = json.loads(response.text)
		close_spots = find_spots(origin, all_spots)
		return jsonify(results = close_spots)
	else:
		return render_template("index.html")
