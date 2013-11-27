#!flask/bin/python
import os
import unittest
import test_helper

from app import app, helpers

origin = [0,0]
potential_spots = test_helper.example_response
max_distance = 0.5

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_get_index(self):
        rv = self.app.get('/')
        assert "<div id='map-canvas'>" in rv.data

    def test_post_index(self):
    	rv = self.app.post('/', data = dict(
	        
    		))
    	assert "results" in rv.data

    def test_helpers_find_spots(self):
    	close_spots = helpers.find_spots(origin, potential_spots)
    	assert len(close_spots) == 1

    def test_helpers_filter_spots(self):
    	close_spots = helpers.filter_spots(origin, potential_spots, max_distance)
    	assert len(close_spots) == 1

    def test_helpers_valid_spot(self):
    	valid_distance = 0.4
    	invalid_distance = 0.6
    	valid_spot = test_helper.valid_spot
    	invalid_spot = test_helper.invalid_spot
    	invalid_spot2 = test_helper.invalid_spot2
    	assert helpers.valid_spot(valid_spot, valid_distance, max_distance) == True
    	assert helpers.valid_spot(valid_spot, invalid_distance, max_distance) == None
    	assert helpers.valid_spot(invalid_spot, valid_distance, max_distance) == None
    	assert helpers.valid_spot(invalid_spot2, valid_distance, max_distance) == None

    def test_helpers_get_distance(self):
    	destination = [0,1]
    	assert helpers.get_distance(origin, destination) == 69.17032342836163

    def test_helpers_uniqify(self):
    	array = [1,1,1,2,2,3,3,3,4,4,5,5]
    	unique_array = [1,2,3,4,5]
    	assert helpers.uniqify(array) == unique_array

if __name__ == '__main__':
    unittest.main()