# -*- coding: utf-8 -*-

import logging
import sqlite3
import unittest

from colorama import Fore
from flask import request
from flask_testing import TestCase

from project import create_app, logger, get_db, DATABASE

# Creates a new instance of the Flask application. The reason for this
# is that we can't interrupt the application instance that is currently
# running and serving requests.
app = create_app()


class TestWebsite(TestCase):

    def create_app(self):
        """
        Instructs Flask to run these commands when we request this group of tests to be run.
        """

        # Sets the configuration of the application to 'TestingConfig' in order
        # that the tests use db_test, not db_dev or db_prod.
        app.config.from_object('config.TestingConfig')

        # Sets the logger to only show ERROR level logs and worse. We don't want
        # to print a million things when running tests.
        logger.setLevel(logging.ERROR)

        return app

    def setUp(self):
        """Defines what should be done before every single test in this test group."""
        pass

    def tearDown(self):
        """Defines what should be done after every single test in this test group."""
        pass

    def test_index_page_successful(self):
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        # cur = get_db().cursor()
        addr = request.remote_addr
        i=0
        i=+1
        cur.execute("INSERT INTO users VALUES(?, ?, ?)", (addr, 'tst', i))
        conn.commit()

        res = cur.execute("select * from users")
        print('\n')
        for row in res:
            print(row)
            # print(Fore.GREEN + row)
        conn.close()

        with self.client:
            response = self.client.get('/')
        self.assertEqual(response.status_code, 200)


# Runs the tests.
if __name__ == '__main__':
    unittest.main()
