#!flask/bin/python
import os
import unittest

from app import app

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()


if __name__ == '__main__':
    unittest.main()