# -*- coding: utf-8 -*-

from flask import jsonify, abort
import queryes
# import queryes.queryT as qt
# from queryes import queryT
from queryes.response_code import ResponseCode
import secret.db_conf as db_conf
# from stringcolor import *


class Controller:
    def __init__(self, arg=''):
        self.response = {}
        self.data = arg
        pass

    def set_response(self, key, val):
        self.response[key] = val

    def show_response(self):
        return jsonify(self.response)

    def run_act(self):
        action = 'get_' + self.data['act']
        # print('\n')
        # print(cs(action, 'red'))
        # query = qt.Query(db_conf.db)
        query = queryes.queryT.Query(db_conf.db)
        # query = queryes.queryT.Query(db_conf.db)
        if hasattr(query, action):
            getattr(query, action)()
            # print(cs(self.response, 'red'))
            query.set_response('message', ResponseCode.codes[query.response['code']]),
            query.set_response('query', self.data),
            return query.show_response()
        else:
            abort(404, description="Resource not found")
