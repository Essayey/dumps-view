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
        self.parser.add_argument('username', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)

    def post(self):
        data = self.parser.parse_args()

        if User.query.filter_by(username=data['username']).first():
            return make_response(jsonify({'message': f"User {data['username']} already exists"}), 403)

        new_user = User(username=data['username'], password_hash=User.generate_hash(data['password']))

        try:
            db.session.add(new_user)
            db.session.commit()

            current_user = User.query.filter_by(username=data['username']).first()
            session['role'] = 'User'
            for role in current_user.roles:
                session['role'] = role.name

            jwt_data = {'id': current_user.id, 'username': current_user.username, 'role': session['role']}

            access_token = create_access_token(identity=jwt_data)
            refresh_token = create_refresh_token(identity=jwt_data)
            resp = make_response(redirect(request.base_url, 302))
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)
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
        self.parser.add_argument('username', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)

    def post(self):
        data = self.parser.parse_args()
        current_user = User.query.filter_by(username=data['username']).first()

        if not current_user:
            return make_response(jsonify({'message': f'User {data["username"]} doesn\'t exist'}), 403)

        if User.verify_hash(data['password'], current_user.password_hash):
            session['role'] = 'User'
            for role in current_user.roles:
                session['role'] = role.name

            jwt_data = {'id': current_user.id, 'username': current_user.username, 'role': session['role']}
            access_token = create_access_token(identity=jwt_data)
            refresh_token = create_refresh_token(identity=jwt_data)
            resp = make_response(redirect(request.base_url, 302))
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)

            return {
                'message': f'Logged in as {current_user.username}',
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return make_response(jsonify({'message': 'Wrong credentials'}, 403))

    @jwt_required(refresh=True)
    def put(self):
        current_user = get_jwt_identity()

        session['role'] = 'User'
        for role in current_user.roles:
            session['role'] = role.name
        jwt_data = {'id': current_user.id, 'username': current_user.username, 'role': session['role']}

        access_token = create_access_token(identity=jwt_data)
        return jsonify({'access_token': access_token})


# class UserLogoutResource(Resource):
#     pass