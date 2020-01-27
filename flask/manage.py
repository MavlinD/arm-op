# -*- coding: utf-8 -*-

"""
This is the entry point of the Flask application.
"""
import os
import unittest

import coverage
from flask_script import Manager
from project import create_app, logger

# The logger should always be used instead of a print(). You need to import it from
# the project package. If you want to understand how to use it properly and why you
# should use it, check: http://bit.ly/2nqkupO
logger.info('Server has started.')
os.environ["APP_SETTINGS"] = "config.DevelopmentConfig"

# Defines which parts of the code to include and omit when calculating code coverage.
abs_path = os.path.abspath(os.path.dirname(__file__)) + '/'

COV = coverage.coverage(
    branch=True,
    include=[
        abs_path + 'project/*',
        abs_path + 'queryes/*',
    ],
    omit=[
        abs_path + 'tests/*',
        abs_path + 'project/website/*',
        # 'project/__init__*',
    ]
)
# Why can't the pydev debugger work with turbogears?
# http://pydev.blogspot.com/2007/06/why-cant-pydev-debugger-work-with.html
# COV.start()
if os.environ["APP_SETTINGS"] == "config.DevelopmentConfig":
    # from stringcolor import *
    pink = 'DeepPink3'
    COV.start()  # it's break debug point

# APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# TEMPLATE_PATH = os.path.join(APP_PATH, 'static/')
# Creates the Flask application object that we use to initialize things in the app.
app = create_app()

# Creates all the models specified in project/models

# Initializes the Manager object, which allows us to run terminal commands on the
# Flask application while it's running (using Flask-Script).
manager = Manager(app)


@manager.command
def cov():
    """
    Runs the unit tests and generates a coverage report on success.

    While the application is running, you can run the following command in a new terminal:
    'docker-compose run --rm flask python manage.py cov' to run all the tests in the
    'tests' directory. If all the tests pass, it will generate a coverage report.

    :return int: 0 if all tests pass, 1 if not
    """

    tests = unittest.TestLoader().discover('tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    else:
        return 1


@manager.command
def upload():
    """
    upload src to production
    """
    scp = 'scp -r /home/mdv/Projects/arm-op/flask  mdv@azot.kmr@oais01.azot.kmr:/opt/www/arm-pq/'
    os.system(scp)


@manager.command
def test():
    """
    Runs the unit tests without generating a coverage report.

    Enter 'docker-compose run --rm flask python manage.py test' to run all the tests in the
    'tests' directory, with no coverage report.

    :return int: 0 if all tests pass, 1 if not
    """
    tests = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    else:
        return 1


@manager.command
def test_one(test_file):
    """
    Runs the unittest without generating a coverage report.

    Enter 'docker-compose run --rm flask python manage.py test_one <NAME_OF_FILE>' to run only
    one test file in the 'tests' directory. It provides no coverage report.
    python3 manage.py test_one test_query

    Example: 'docker-compose run --rm flask python manage.py test_one test_website'
    Note that you do not need to put the extension of the test file.

    :return int: 0 if all tests pass, 1 if not
    """

    pattern = test_file + '.py'
    if not os.path.isfile(os.path.abspath(os.path.dirname(__file__)) + '/tests/' + pattern):
        pass
        # print(cs("Test file: {} not exist ((".format('/flask/tests/' + pattern), pink))

    tests = unittest.TestLoader().discover('tests', pattern)
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    else:
        return 1


# Starts the Flask app.
if __name__ == '__main__':
    manager.run()

# export APP_SETTINGS=config.DevelopmentConfig
# pip freeze>requirements.txt
