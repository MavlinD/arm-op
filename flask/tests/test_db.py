# -*- coding: utf-8 -*-

import logging
import sqlite3
import unittest
from collections import defaultdict

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

    def t0est_index_page_successful(self):
        db = sqlite3.connect(':memory:')
        c = db.cursor()
        c.execute("CREATE TABLE status(location TEXT, arrival TEXT, departure TEXT)")
        SQL = "INSERT INTO status VALUES (:location, :arrival, :departure)"
        # build each row as a defaultdict
        f = lambda: None  # use str if you prefer
        row1 = defaultdict(f, {'location': 'place1', 'departure': '1000'})
        row2 = defaultdict(f, {'location': 'place2', 'arrival': '1010'})
        rows = (row1, row2)
        # insert rows, executemany can be safely used without additional code
        c.executemany(SQL, rows)
        db.commit()
        # print result
        c.execute("SELECT * FROM status")
        print(list(zip(*c.description))[0])
        for r in c.fetchall():
            print(r)
        db.close()

    def test_index_page_successful(self):
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        sql = "INSERT OR REPLACE INTO workLog " \
              "VALUES(:ip_addr, :wagon_or_container,:consignment, " \
              "(SELECT count FROM workLog " \
              "WHERE wagon_or_container=:wagon_or_container " \
              "AND consignment=:consignment AND ip_addr=:ip_addr)+1)"
        f = lambda: None  # use str if you prefer
        row = defaultdict(f, {
            'ip_addr': 'addr',
            'wagon_or_container': 'test',
            'consignment': 'tst',
        })
        cur.execute(sql, row)
        conn.commit()

        res = cur.execute("select * from workLog")
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
