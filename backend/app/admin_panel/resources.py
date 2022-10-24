from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db, access_required
from flask_cors import  cross_origin

class ChangeDumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("status", type=int, location='args')

    @cross_origin()
    @jwt_required()
    @access_required(role="Admin")
    def put(self, dump_id):
        data = self.parser.parse_args()
        dump = Dump.query.filter_by(id=dump_id).first()
        dump.status = data["status"]
        db.session.commit()
        return make_response(jsonify({'result': True}), 201)
