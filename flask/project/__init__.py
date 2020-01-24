# -*- coding: utf-8 -*-

"""
This is the root of the main package of our Flask app: project.

Whenever you see 'from project import <something>', it takes it
from here.
"""

import os
import logging

from flask import Flask, jsonify, request
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy

# Defines the format of the logging to include the time and to use the INFO logging level or worse.
logging.basicConfig(format='%(asctime)s %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S', level=logging.INFO)
logger = logging.getLogger(__name__)

# db = SQLAlchemy()


def create_app():

    """
    Flask application factory that creates app instances.

    Every time this function is called, a new application instance is created. The reason
    why an application factory is needed is because we need to use different configurations
    for running our tests.

    :return Flask object: Returns a Flask application instance
    """

    app = Flask(__name__, template_folder='static/')
    app.url_map.strict_slashes = False
    CORS(app)
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    @app.errorhandler(404)
    def page_not_found(e):
        """Return JSON instead of HTML for HTTP errors."""
        # start with the correct headers and status code from the error
        return jsonify(
            code=int(e.code),
            data=str(e.name),
            message=str(e.description),
            query=request.url,
        ), 200

    # db.init_app(app)

    # Blueprints are used for scalability. If you want to read more about it, visit:
    # http://flask.pocoo.org/docs/0.12/blueprints/
    from project.controllers.routes import website_blueprint
    app.register_blueprint(website_blueprint)

    return app
