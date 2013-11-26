from flask import render_template
from app import app
from forms import Locator

@app.route('/', methods = ['GET', 'POST'])
def index():
    return render_template("index.html")
