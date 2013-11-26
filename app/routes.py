import requests, json
from flask import render_template, request
from app import app
from forms import Locator

@app.route('/', methods = ['GET', 'POST'])
def index():
	form = Locator()
	if request.method == 'POST':
		latitude = float(form.latitude.data)
		longitude = float(form.longitude.data)
		response = requests.get("http://data.sfgov.org/resource/w969-5mn4.json?status=COMPLETE")
		return render_template("index.html", 
			response = response,
			form = form)
	else:
		return render_template("index.html", form = form)
