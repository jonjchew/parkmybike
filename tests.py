#!flask/bin/python
import os
import unittest

from app import app

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()


    def test_locate_user_on_load(self):
        rv = self.app.get('/')
        print rv
        assert 'Hello, World!' in rv.data

if __name__ == '__main__':
    unittest.main()