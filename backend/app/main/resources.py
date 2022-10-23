from werkzeug.datastructures import FileStorage
from flask_restful import Resource, reqparse
from app.models import User, Dump
from flask import jsonify, request, make_response
import json


class DumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self, dump_id):
        # код
        return jsonify({'successss': True})

    def post(self, dump_id):
        """Создаёт свалку"""
        # self.parser.add_argument('name', type=str, default='xxx', location='args')
        # self.parser.add_argument('name2', type=str, default='yyy', location='args')
        self.parser.add_argument('photo', type=FileStorage, location='files')
        args = self.parser.parse_args()

        if file := args['photo']:
            file.save(f'app/static/{dump_id}.jpg')

        return make_response(jsonify({'res': True}), 201)


class DumpListResource(Resource):
    def get(self):
        # код
        return jsonify({'результат': 'данные'})