import datetime
import json
import sqlalchemy
from flask import flash, redirect, url_for, request, jsonify, current_app
from flask_login import current_user, login_required
from app.auth import api
from app.auth.resources import UserRegistrationResource, UserLoginResource
from app.main.resources import DumpResource
from sqlalchemy import create_engine


api.add_resource(UserRegistrationResource, '/user/registration')
api.add_resource(UserLoginResource, '/user/login')
