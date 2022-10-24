from werkzeug.datastructures import FileStorage
from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db


class DumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self, dump_id):
        if dump := Dump.query.filter_by(id=dump_id).first():
            return jsonify(dump)
        return jsonify({'message': 'User not found'})

    def post(self, dump_id):
        """Создаёт свалку"""
        self.parser.add_argument('lng', type=str, location='args')
        self.parser.add_argument('lat', type=str, location='args')
        self.parser.add_argument('description', type=str, location='args')
        self.parser.add_argument('user_id', type=int, location='args')
        self.parser.add_argument('photo', type=FileStorage, location='files')
        args = self.parser.parse_args()
        new_dump = Dump(longitude=args['lng'], latitude=args['lat'], description=args['description'])

        if file := args['photo']:
            file.save(f'app/static/dumps/{dump_id}.jpg')

        try:
            db.session.add(new_dump)
            db.session.commit()
            user = User.query.filter_by(id=args['user_id']).first()
            user.dumps.append(new_dump)
            db.session.commit()
            return make_response(jsonify({'res': True}), 201)

        except:
            return {'message': 'Something went wrong'}, 500


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

        dumps = Dump.query

        if args['order_by_status'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_status'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        if args['order_by_date'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_date'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        return jsonify(dumps.all())


