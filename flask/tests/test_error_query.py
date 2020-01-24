# -*- coding: utf-8 -*-

import logging, json
import unittest
from stringcolor import *
from flask_testing import TestCase
from project import create_app, logger

app = create_app()


class TestQueries(TestCase):
    test_next_div = '\n' + '=-' * 25 + '\n'

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
        # print('next test')
        """Defines what should be done after every single test in this test group."""
        pass

    def test_err_post_Query(self):
        # print('\n')
        with self.client:
            # pass
            lst = [
                # '',
                # '/',
                # '/fake',
                # '/fake/',
                # '/prv',
                # '/ntr',
                {
                    'wagon_or_container_err': 'ФБ11111111',
                    'consignment': "ПЯ22222222"
                },
                # 'snc',
                # 'osp',
                # 'raw',
                # '/plan_factory',
                # '/gruz',
                # '/empty_cargo',
                # {
                #     'act': 'lntr',
                #     'box': 'LNTR2',
                #     'path': '/Scheme/ViewSvgScheme/4f044795-5de1-471e-bb97-fb175bfed265'
                # },
                # '/fake_request',
                # '/broken_request',
                # 'org_unit_asou',
                # 'analytical_control',
                # '/api'
            ]

            for payload in lst:
                # self.response = self.client.post(tst, data={'name': 'fred', 'passwd': 'secret'})
                # payload = {
                #   'wagon': el,
                #   'consignment': el,
                # }
                # dt = jsonify(payload)
                # dt = json.dumps(payload)
                self.response = self.client.post('/api', data=json.dumps(payload), content_type="application/json")
                # self.response = self.client.post('/api', data={'act': tst})
                # self.response = self.client.get(tst)
                self.assertEqual(self.response.status_code, 422)
                self.print_response()

    def print_response(self):
        data = json.loads(self.response.get_data(as_text=True))
        # print(cs(self.test_next_div, 'green'))
        for key in data:
            if type(data) == dict:
                print("{} is {}".format(key, data[key]))
            else:
                print("{}".format(key))


# Runs the tests.
if __name__ == '__main__':
    unittest.main()
