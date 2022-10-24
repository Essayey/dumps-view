import logging
from logging.handlers import RotatingFileHandler
import os
from functools import wraps
from flask import Flask, session, jsonify
from flask_json import FlaskJSON
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_restful import Api
from flask_jwt_extended import JWTManager, jwt_required

db = SQLAlchemy()
migrate = Migrate()
json = FlaskJSON()
api = Api()
jwt = JWTManager()


def create_app(config_class=Config):
    app = Flask(__name__, static_url_path='/static',
                template_folder='templates',
                static_folder='static')
    app.config.from_object(config_class)
    # app.debug = True
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # from app.errors import bp as errors_bp
    # app.register_blueprint(errors_bp)

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.admin_panel import bp as admin_panel
    app.register_blueprint(admin_panel, url_prefix='/admin_panel')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    if not app.debug and not app.testing:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/main.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '\n%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('Dumps started')

    return app


from app import models


# @jwt.token_in_blocklist_loader()
# def check_if_token_in_blacklist(decrypted_token):
#     jti = decrypted_token['jti']
#     return models.RevokedTokenModel.is_jti_blacklisted(jti)

def access_required(role="ANY"):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            if role == "ANY" or (session.get("role") is None and role == "ANY") or session.get("role") == role:
                return fn(*args, **kwargs)
            else:
                return jsonify({'message': 'denied'})
        return decorated_view
    return wrapper
