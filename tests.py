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

    def test_helpers_filter_spots(self):
    	origin = [0,0]
    	all_spots = test_helper.example_response
    	max_distance = 0.5
    	close_spots = helpers.filter_spots(origin,all_spots,max_distance)
    	assert len(close_spots) == 1

    def test_helpers_valid_spot(self):
    	max_distance = 0.5
    	valid_distance = 0.4
    	valid_spot = test_helper.valid_spot
    	invalid_distance = 0.6
    	invalid_spot = test_helper.invalid_spot
    	invalid_spot2 = test_helper.invalid_spot2
    	assert helpers.valid_spot(valid_spot, valid_distance, max_distance) == True
    	assert helpers.valid_spot(valid_spot, invalid_distance, max_distance) == None
    	assert helpers.valid_spot(invalid_spot, valid_distance, max_distance) == None
    	assert helpers.valid_spot(invalid_spot2, valid_distance, max_distance) == None


if __name__ == '__main__':
    unittest.main()