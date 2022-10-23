from datetime import datetime
from flask import current_app
from flask_login import UserMixin
from app import db, login
from sqlalchemy.orm import backref, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Integer, String, \
    Column, DateTime, ForeignKey, Numeric, Boolean


Base = declarative_base()

user_dump = Table('user_dump', Base.metadata,
                    Column('user_id', ForeignKey("user.id")),
                    Column('dump_id', ForeignKey("dump.id"))
                    )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    login = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    rating = db.Column(db.Integer)
    number_confirmed_dumps = db.Column(db.Integer)
    number_of_false_dumps = db.Column(db.Integer)

    dumps = relationship("Dump", secondary=user_dump, back_populates="users")

    def set_password(self, password):
        self.password_hash = password

    def check_password(self, password):
        return self.password_hash == password


class Dump(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True, autoincrement=True)
    longitude = db.Column(db.String(16))
    latitude = db.Column(db.String(16))
    description = db.Column(db.Text())
    status = db.Column(db.Integer, default=0)

    users = relationship("User", secondary=user_dump, back_populates="dumps")
