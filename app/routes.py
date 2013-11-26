import requests, json
from flask import render_template, request, jsonify
from app import app
from forms import Locator
from helpers import find_spots

@app.route('/', methods = ['GET', 'POST'])
def index():
	form = Locator()
	if request.method == 'POST':
		latitude = float(form.latitude.data)
		longitude = float(form.longitude.data)
		origin = [latitude, longitude]

		response = requests.get("http://data.sfgov.org/resource/w969-5mn4.json?status=COMPLETE&$limit=5")
		all_spots = json.loads(response.text)
		close_spots = find_spots(origin, all_spots)

		return jsonify(results = close_spots)
	else:
		return render_template("index.html", form = form)
