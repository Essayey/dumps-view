from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db, access_required


class ChangeDumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("id", type=int)
        self.parser.add_argument("status", type=int)

    # @access_required(role="Admin")
    def put(self):
        data = self.parser.parse_args()
        dump = Dump.query.filter_by(id=data["id"]).first()
        dump.status = data["status"]
        db.session.commit()
        if dump.users[0]:
            dump.users[0].number_confirmed_dumps += 1
            db.session.commit()
        return make_response(jsonify({'result': True}), 201)