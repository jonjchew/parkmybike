from flask import render_template
from app import app
from forms import Locator

@app.route('/')
def index():
    return render_template("index.html")
