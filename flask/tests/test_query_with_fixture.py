# -*- coding: utf-8 -*-

import logging, json
import unittest

from flask_testing import TestCase

from project import create_app, logger
from stringcolor import *

pink = 'DeepPink3'

from queryes import queryT
from secret.db_conf import db

app = create_app()


class TestQueries(TestCase):
    test_next_div = '\n' + '=-' * 25 + '\n'

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        logger.setLevel(logging.ERROR)
        return app

    def setUp(self):
        # Load test data
        import os

        fixture = os.path.abspath(os.path.dirname(__file__))+'/fixtures/Azot_OrgUnitForACOY-orig.sql'
        with open(fixture) as sql_file:
            self.content = sql_file.read()
            # print(cs(sql_file, pink))
            # print(cs(self.content, pink))

    def tearDown(self):
        pass

    def test_get_Query(self):
        # print('\n')
        with self.client:
            pass

            lst = [
                # 'org_unit_asou',
            ]

            for tst in lst:
                self.response = self.client.get(tst)
                self.assertEqual(self.response.status_code, 200)
                self.print_response()

    def print_response(self):
        data = json.loads(self.response.get_data(as_text=True))
        print(cs(self.test_next_div, 'green'))
        for key in data:
            if type(data) == dict:
                print("{} is {}".format(key, data[key]))
            else:
                print("{}".format(key))


# Runs the tests.
if __name__ == '__main__':
    unittest.main()
