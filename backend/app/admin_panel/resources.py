from flask_restful import Resource, reqparse
from app.models import Dump, User
from flask import jsonify, make_response
from app import db


class ChangeDumpStatusResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()

    def put(self, dump_id):
        # код
        pass