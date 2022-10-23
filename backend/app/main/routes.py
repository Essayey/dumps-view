import datetime
import json
import sqlalchemy
from flask import flash, redirect, url_for, request, jsonify, current_app
from flask_login import current_user, login_required
from app.main import api
from app.main.resources import DumpResource
from sqlalchemy import create_engine


api.add_resource(DumpResource, '/dump/<int:dump_id>')