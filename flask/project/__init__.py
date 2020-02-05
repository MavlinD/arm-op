# -*- coding: utf-8 -*-

"""
This is the root of the main package of our Flask app: project.

Whenever you see 'from project import <something>', it takes it
from here.
"""

import os
import logging
import sqlite3
# from project import config
# project # as project

# import flask.config as config

from flask import Flask, jsonify, request, g
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy

# Defines the format of the logging to include the time and to use the INFO logging level or worse.
logging.basicConfig(format='%(asctime)s %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S', level=logging.INFO)
logger = logging.getLogger(__name__)


# db = SQLAlchemy()
# DATABASE = '/tmp/flaskr.db'
DATABASE = "./database.db"
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'


conn = sqlite3.connect(DATABASE)
cur = conn.cursor()
if not os.path.exists(DATABASE):
    # conn = sqlite3.connect(DATABASE)
    # cur = conn.cursor()
    cur.execute("CREATE TABLE users (fname TEXT, lname TEXT, age INTEGER);")
    conn.commit()
    cur.execute("INSERT INTO users VALUES('Mike', 'Tyson', '111');")
    cur.execute("INSERT INTO users VALUES('Thomas', 'Jasper', '40');")
    cur.execute("INSERT INTO users VALUES('Jerry', 'Mouse', '40');")
    cur.execute("INSERT INTO users VALUES('Peter', 'Pan', '40');")
    conn.commit()
else:
    cur.execute("DELETE FROM users")
    conn.commit()
    cur.execute("INSERT INTO users VALUES('efwew', 'ln', '999');")
    cur.execute("INSERT INTO users VALUES('Thomas', 'Jasper', '40');")
    cur.execute("INSERT INTO users VALUES('Jerry', 'Mouse', '40');")
    cur.execute("INSERT INTO users VALUES('Peter', 'Pan', '40');")
    conn.commit()
conn.close()


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

# def get_db():
#     """Если ещё нет соединения с базой данных, открыть новое - для
#     текущего контекста приложения
#     """
#     if not hasattr(g, 'sqlite_db'):
#         g.sqlite_db = connect_db()
#     return g.sqlite_db
#
#
# @app.teardown_appcontext
# def close_db(error):
#     """Closes the database again at the end of the request."""
#     if hasattr(g, 'sqlite_db'):
#         g.sqlite_db.close()


def create_app():
    """
    Flask application factory that creates app instances.

    Every time this function is called, a new application instance is created. The reason
    why an application factory is needed is because we need to use different configurations
    for running our tests.

    :return Flask object: Returns a Flask application instance
    """

    app = Flask(__name__)
    app.url_map.strict_slashes = False
    CORS(app)
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    app.config.update(dict(
        DATABASE=os.path.join(app.root_path, 'flaskr.db'),
        DEBUG=True,
        SECRET_KEY='development key',
        USERNAME='admin',
        PASSWORD='123'
    ))
    app.config.from_envvar('FLASKR_SETTINGS', silent=True)

    # db = SQLAlchemy(app)

    # @app.errorhandler(404)
    # def page_not_found(e):
    #     """Return JSON instead of HTML for HTTP errors."""
    #     # start with the correct headers and status code from the error
    #     return jsonify(
    #         code=int(e.code),
    #         data=str(e.name),
    #         message=str(e.description),
    #         query=request.url,
    #     ), 200

    # db.init_app(app)
    # helper to close
    @app.teardown_appcontext
    def close_connection(exception):
        db = getattr(g, '_database', None)
        if db is not None:
            print('++++++++ close_connection ++++++++++++')
            db.close()

    # Blueprints are used for scalability. If you want to read more about it, visit:
    # http://flask.pocoo.org/docs/0.12/blueprints/
    from project.controllers.routes import website_blueprint
    app.register_blueprint(website_blueprint)

    # connect_db(app)

    # get_db()
    # app.rv = sqlite3.connect(app.config['DATABASE'])
    # app.rv.row_factory = sqlite3.Row

    # if not hasattr(g, 'sqlite_db'):
    #     g.sqlite_db = connect_db(app)
    # app.connect = g.sqlite_db

    return app


