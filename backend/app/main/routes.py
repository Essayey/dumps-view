import datetime
import json
import sqlalchemy
from flask import flash, redirect, url_for, request, jsonify, current_app
from flask_login import current_user, login_required
from app.main import bp
from sqlalchemy import create_engine

engine = create_engine("sqlite:///T_Park.db")
sql_null = sqlalchemy.null()


@bp.route('/', methods=['GET', 'POST'])
def index():
    return jsonify('success')
