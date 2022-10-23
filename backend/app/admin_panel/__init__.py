from flask import Blueprint
from flask_restful import Api

bp = Blueprint('admin_panel', __name__)
api = Api()
api.init_app(bp)

from app.admin_panel import routes
