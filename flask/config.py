# -*- coding: utf-8 -*-

"""
This file stores all the possible configurations for the Flask app.

Changing configurations like the secret key or the database
url should be stored as environment variables and imported
using the 'os' library in Python.
"""

import os


class BaseConfig:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    DEBUG = False
    TESTING = False


class TestingConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_TEST_URL')
    DEBUG = True
    TESTING = True


class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    DEBUG = True


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    DEBUG = False


basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'


