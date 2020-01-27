# -*- coding: utf-8 -*-

import json
from flask import Blueprint, render_template, abort, request, jsonify
from queryes import controller
# from stringcolor import *

from webargs import fields, validate
from webargs.flaskparser import use_args

website_blueprint = Blueprint('website_blueprint', __name__)


@website_blueprint.route('/')
# @website_blueprint.route('/', methods=['GET'])
def index():
    # Controller logic should go here
    return render_template('index.html')


# Return validation errors as JSON
# @website_blueprint.errorhandler(200)
@website_blueprint.errorhandler(422)
@website_blueprint.errorhandler(400)
def handle_error(err):
    headers = err.data.get("headers", None)
    messages = err.data.get("messages", ["Invalid request."])
    if headers:
        return jsonify({"errors": messages}), err.code, headers
    else:
        return jsonify({"errors": messages}), err.code


@website_blueprint.route("/api", methods=['POST'])
@use_args({
    "wagon_or_container": fields.Str(required=True, validate=[validate.Length(min=8, max=11)]),
    "consignment": fields.Str(required=True, validate=[validate.Length(min=8, max=8)])
})
def get_query_post(args):
    data = request.json
    # print(cs(request, 'blue'))

    data['data'] = {}
    data['data']['code'] = 0
    data['data']['message'] = 'Everything goes according to plan...'
    data['data']['query'] = args
    data['data']['path'] = args['wagon_or_container'] + '=5-5-5=' + args['consignment']
    # print(cs(data, 'blue'))
    return data


def run_query(arg):
    return controller.Controller(arg).run_act()
