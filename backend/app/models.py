from datetime import datetime
from flask import current_app, jsonify
from flask_login import UserMixin
from app import db
import jwt
from functools import wraps
from flask import request
from passlib.hash import pbkdf2_sha256 as sha256

user_dump = db.Table('user_dump',
                     db.Column('user_id', db.ForeignKey("users.id")),
                     db.Column('dump_id', db.ForeignKey("dumps.id"))
                     )


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    rating = db.Column(db.Integer)
    number_confirmed_dumps = db.Column(db.Integer)
    number_of_false_dumps = db.Column(db.Integer)

    dumps = db.relationship("Dump", secondary=user_dump, back_populates="users")

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


class Dump(db.Model):
    __tablename__ = 'dumps'
    id = db.Column(db.Integer, unique=True, primary_key=True, autoincrement=True)
    longitude = db.Column(db.String(16))
    latitude = db.Column(db.String(16))
    description = db.Column(db.Text())
    status = db.Column(db.Integer, default=0)

    users = db.relationship("User", secondary=user_dump, back_populates="dumps")
