from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db, access_required


class ChangeDumpResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    @jwt_required()
    @access_required(role="Admin")
    def put(self, dump_id):
        # код
        # print(123)
        return jsonify({'res': True})
