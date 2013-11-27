#!flask/bin/python
import os
import unittest
import test_helper

from app import app, helpers


class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()


    # def test_locate_user_on_load(self):
    #     rv = self.app.get('/')
    #     assert 'Hello, World!' in rv.data

    def test_helpers_find_spots(self):
    	potential_spots = test_helper.example_response
    	origin = [0,0]
    	close_spots = helpers.find_spots(origin,potential_spots)
    	assert len(close_spots) == 1


if __name__ == '__main__':
    unittest.main()