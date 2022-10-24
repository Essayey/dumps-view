from flask import Blueprint
from flask_restful import Api

bp = Blueprint('auth', __name__)
api = Api()
api.init_app(bp)

from app.auth import routes
