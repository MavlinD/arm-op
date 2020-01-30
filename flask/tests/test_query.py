# -*- coding: utf-8 -*-

"""
https://webdevblog.ru/vvedenie-v-testirovanie-v-python/
    Это точка входа в тест. Это означает, что если вы выполните скрипт, запустив python test.py
    в командной строке, он вызовет unittest.main().
    Эта команда запускает тестовый раннер, обнаруживая в этом файле все классы, которые наследуются
    от unittest.TestCase.

This file defines the group of tests for the simple website routes.

You can run this test group file by running the application and
running 'docker-compose run --rm flask python manage.py test_one test_website'
in a separate terminal window.
"""

import logging, json
import unittest
# from stringcolor import * // have trable to install pkg-resources==0.0.0

from flask_testing import TestCase
from project import create_app, logger

# Creates a new instance of the Flask application. The reason for this
# is that we can't interrupt the application instance that is currently
# running and serving requests.
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

    def test_get_Query(self):
        # print('\n')
        with self.client:
            pass

            lst = [
                # '',
                # '/',
                # '/fake',
                # '/fake/',
                # '/prv',
                # '/ntr',
                # '/bsp',
                # '/raw',
                # '/plan_factory',
                # '/gruz',
                # '/empty_cargo',
                # {
                #     'act': 'lntr',
                #     'box': 'LNTR2',
                #     'path': '/Scheme/ViewSvgScheme/4f044795-5de1-471e-bb97-fb175bfed265'
                # },
                # '/lntr',
                # '/fake_request',
                # '/broken_request',
                # 'org_unit_asou',
                # 'analytical_control',
                # '/api'
            ]

            for payload in lst:
                # self.response = self.client.post(tst, data={'name': 'fred', 'passwd': 'secret'})
                # payload = {
                #     'act': tst,
                # }
                # dt = jsonify(payload)
                # dt = json.dumps(payload)
                # self.response = self.client.post('/api', data=dt, content_type="application/json")
                # self.response = self.client.post('/api', data={'act': tst})
                # self.response = self.client.post(payload)
                self.response = self.client.get(payload)  # !!!
                # self.response = self.client.get(payload['act'])
                self.assertEqual(self.response.status_code, 200)
                self.print_response()

    def Otest_empty_post_Query(self):
        # print('\n')
        with self.client:
            pass

            lst = [
                # '',
                # '/',
                # '/fake',
                # '/fake/',
                # '/prv',
                # '/ntr',
                '/bsp',
                # '/raw',
                # '/plan_factory',
                # '/gruz',
                # '/empty_cargo',
                # {
                #     'act': 'lntr',
                #     'box': 'LNTR2',
                #     'path': '/Scheme/ViewSvgScheme/4f044795-5de1-471e-bb97-fb175bfed265'
                # },
                # '/lntr',
                # '/osp',
                # '/fake_request',
                # '/broken_request',
                # 'org_unit_asou',
                # 'analytical_control',
                # '/api'
            ]

            for payload in lst:
                # self.response = self.client.post(tst, data={'name': 'fred', 'passwd': 'secret'})
                # payload = {
                #     'act': tst,
                # }
                # dt = jsonify(payload)
                # dt = json.dumps(payload)
                # self.response = self.client.post('/api', data=dt, content_type="application/json")
                # self.response = self.client.post('/api', data={'act': tst})
                self.response = self.client.post(payload)
                # self.response = self.client.get(payload) # !!!
                # self.response = self.client.get(payload['act'])
                self.assertEqual(self.response.status_code, 200)
                self.print_response()

    def test_post_Query(self):
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
                    'data': {
                        'wagon_or_container': 'ФБ123456789',
                        'consignment': "ПЯ123456",
                    },
                    'select': 'Passport',
                    'mode': 'get_file',
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
                self.assertEqual(self.response.status_code, 200)
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
