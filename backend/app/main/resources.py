from werkzeug.datastructures import FileStorage
from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db, access_required
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from os import getcwd
from flask import current_app


class DumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        self.parser.add_argument('id', type=int, required=True)
        args = self.parser.parse_args()

        dump_id = args['id']
        if dump := Dump.query.filter_by(id=dump_id).first():
            return jsonify(dump)
        return jsonify({'message': 'User not found'})

    def post(self):
        """Создаёт свалку"""
        self.parser.add_argument('lng', type=str, required=True, location="form")
        self.parser.add_argument('lat', type=str, required=True, location="form")
        self.parser.add_argument('description', type=str, location="form")
        self.parser.add_argument('photo', type=FileStorage, location='files')
        args = self.parser.parse_args()

        new_dump = Dump(longitude=args['lng'], latitude=args['lat'], description=args['description'] if args['description'] else '')

        try:
            db.session.add(new_dump)
            db.session.commit()

            dump = Dump.query.all()[-1]
            if file := args['photo']:
                current_app.logger.info(getcwd() + f'\\app\\static\\dumps\\{dump.id}.jpg', file)
                file.save(getcwd() + f'\\app\\static\\dumps\\{dump.id}.jpg')

            # if user := User.query.filter_by(id=args['user_id']).first() and jwt_required():
            #     new_dump.users.append(user)

            db.session.commit()
            return make_response(jsonify({'result': True}), 201)
        except:
            return {'message': 'Something went wrong'}, 500

    @jwt_required()
    @access_required(role="Admin")
    def delete(self):
        try:
            self.parser.add_argument('id', type=int, required=True)
            args = self.parser.parse_args()
            dump = Dump.query.filter_by(id=args['id']).first()

            if dump:
                if dump.users[0]:
                    dump.users[0].number_false_dumps += 1
                    db.session.commit()
                db.session.delete(dump)
                db.session.commit()
                return make_response(jsonify({'result': 'delete'}), 202)
            return make_response(jsonify({'delete': 'obj not found'}), 202)
        except:
            return {'message': 'Something went wrong'}, 500


class DumpListResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def get(self):
        dumps = Dump.query.all()
        return jsonify(dumps)

    def post(self):
        self.parser.add_argument('order_by_status', type=bool)
        self.parser.add_argument('order_by_date', type=bool)
        args = self.parser.parse_args()

        dumps = Dump.query

        if args['order_by_status'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_status'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        if args['order_by_date'] is not None:
            order_by_status = Dump.status.asc() if args['order_by_date'] else Dump.status.desc()
            dumps = dumps.order_by(order_by_status)

        return jsonify(dumps.all())


