from werkzeug.datastructures import FileStorage
from flask_restful import Resource, reqparse
from app.models import Dump
from flask import jsonify, make_response


class DumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self, dump_id):
        if dump := Dump.query.filter_by(id=dump_id).first():
            return jsonify(dump)
        return jsonify({'message': 'User not found'})

    def post(self, dump_id):
        """Создаёт свалку"""
        # self.parser.add_argument('name', type=str, default='xxx', location='args')
        # self.parser.add_argument('name2', type=str, default='yyy', location='args')
        self.parser.add_argument('photo', type=FileStorage, location='files')
        args = self.parser.parse_args()

        if file := args['photo']:
            file.save(f'app/static/dumps/{dump_id}.jpg')

        return make_response(jsonify({'res': True}), 201)


class DumpListResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        dumps = Dump.query.all()
        return jsonify(dumps)

    def post(self):
        self.parser.add_argument('order_by_status', type=bool, location='args')
        self.parser.add_argument('order_by_date', type=bool, location='args')
        args = self.parser.parse_args()

        print(args['order_by_status'])

        dumps = Dump.query

        if args['order_by_status'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_status'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        if args['order_by_date'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_date'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        return jsonify(dumps.all())


