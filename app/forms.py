from flask.ext.wtf import Form
from wtforms import HiddenField
from wtforms.validators import Required

class Locator(Form):
    longitude = HiddenField('longitude', validators = [Required()])
    latitude = HiddenField('latitude', validators = [Required()])
