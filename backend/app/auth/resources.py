from werkzeug.datastructures import FileStorage
from flask_restful import Resource, reqparse
from app.models import User, Dump, Role
from flask import jsonify, make_response, redirect, request, session
from app import db
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, set_access_cookies,\
    set_refresh_cookies, get_jwt_identity


class UserRegistrationResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', type=str, required=True, location='args')
        self.parser.add_argument('password', type=str, required=True, location='args')

    def post(self):
        data = self.parser.parse_args()

        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': f"User {data['username']} already exists"})

        new_user = User(username=data['username'], password_hash=User.generate_hash(data['password']))

        try:
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'message': f'User {data["username"]} was created',
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except:
            return {'message': 'Something went wrong'}, 500


class UserLoginResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', type=str, required=True, location='args')
        self.parser.add_argument('password', type=str, required=True, location='args')

    def post(self):
        data = self.parser.parse_args()
        current_user = User.query.filter_by(username=data['username']).first()

        if not current_user:
            return {'message': f'User {data["username"]} doesn\'t exist'}

        if User.verify_hash(data['password'], current_user.password_hash):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            resp = make_response(redirect(request.base_url, 302))
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)

            session['role'] = 'User'
            for role in current_user.roles:
                session['role'] = role.name

            return {
                'message': f'Logged in as {current_user.username}',
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return {'message': 'Wrong credentials'}

    @jwt_required(refresh=True)
    def put(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return jsonify({'access_token': access_token})


# class UserLogoutResource(Resource):
#     pass