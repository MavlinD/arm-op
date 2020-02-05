# -*- coding: utf-8 -*-

import os, json
from flask import Blueprint, render_template, abort, request, jsonify
from marshmallow import Schema, validates_schema, ValidationError

from queryes import controller
from colorama import init, Fore, Style

from webargs import fields, validate
from webargs.flaskparser import use_args

init()  # colorama

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


class DataSchema(Schema):
    wagon_or_container = fields.Str(required=True, validate=[validate.Length(max=11)])
    consignment = fields.Str(required=True, validate=[validate.Length(max=11)])


class PayloadSchema(Schema):  # http://www.cameronmacleod.com/blog/better-validation-flask-marshmallow
    # pass
    select = fields.Str(required=True, validate=[validate.Length(max=11)])
    mode = fields.Dict(required=True)


@website_blueprint.route("/api", methods=['POST'])
# @json.loads(request.form['payload'])
# @use_args({
# "select": json.loads(request.form['payload']),
# "select": fields.Str(validate=[validate.Length(max=11)]),
# "mode": fields.Str(validate=[validate.Length(max=11)]),
# 'data': fields.Dict(keys=fields.Str(), values=fields.Str())  # !!!
# })
def get_query_post():
    payload = json.loads(request.form['payload'])

    # data = request.json # !!!
    # print(cs(request, 'blue'))
    root_dir = './flask/project/'
    # root_dir = './project/'
    passports_dir = 'static/passports/'

    try:
        PayloadSchema().load(payload)
        DataSchema().load(payload['mode']['get_file'])

    except ValidationError as error:
        err = error
        response = {
            'code': 1,
            'message': 'Something went wrong...:(',
            'err': err.messages,
            'query': payload,
        }
        return response

    # subfolders = [f.path for f in os.scandir(root_dir) if f.is_dir()]
    name_file = 'Паспорт-{}-{}.pdf'.format(payload['mode']['get_file']['wagon_or_container'],
                                           payload['mode']['get_file']['consignment'])
    # name_file = 'Паспорт-{}-{}.pdf'.format(payload['data']['wagon_or_container'], payload['data']['consignment'])
    is_file_exists = os.path.exists('{}{}{}'.format(root_dir, passports_dir, name_file))
    full_path_to_file = '{}{}{}'.format(root_dir, passports_dir, name_file)
    response = {
        'data': {
            'path_to_file': '{}{}'.format(passports_dir, name_file),
            'is_file_exists': is_file_exists,
            # 'subfolders': subfolders,
        },
        'code': 0,
        'message': 'Everything goes according to plan...',
        'query': payload,
        'full_path_to_file': full_path_to_file,
        # 'query': args,
    }

    # print(Fore.GREEN + "{}".format(file_name))
    # print(Fore.GREEN + file_name)
    # print(Style.RESET_ALL)
    return response


def run_query(arg):
    return controller.Controller(arg).run_act()
