from flask import render_template
from app import app
from forms import Locator

@app.route('/', methods = ['GET', 'POST'])
def index():
	form = Locator()
	return render_template("index.html", form = form)
