# -*- coding: utf-8 -*-

import os
from flask import Blueprint, render_template, abort, request, jsonify
from queryes import controller
from colorama import init, Fore, Style

from webargs import fields, validate
from webargs.flaskparser import use_args

init() # colorama

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
    # data = request.json
    # print(cs(request, 'blue'))
    root_dir = './project/'
    passports_dir = 'static/fixtures/'
    # subfolders = [f.path for f in os.scandir(root_dir) if f.is_dir()]
    name_file = 'Паспорт-{}-{}.pdf'.format(args['wagon_or_container'], args['consignment'])
    is_file_exists = os.path.exists('{}{}{}'.format(root_dir, passports_dir, name_file))
    response = {
        'data': {
            'path_to_file': '{}{}'.format(passports_dir, name_file),
            'is_file_exists': is_file_exists,
            # 'subfolders': subfolders,
        },
        'code': 0,
        'message': 'Everything goes according to plan...',
        'query': args,
    }

    # print(Fore.GREEN + "{}".format(file_name))
    # print(Fore.GREEN + file_name)
    # print(Style.RESET_ALL)
    return response


def run_query(arg):
    return controller.Controller(arg).run_act()
