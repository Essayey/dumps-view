from datetime import datetime
from app import db
from passlib.hash import pbkdf2_sha256 as sha256
from dataclasses import dataclass, field

user_dump = db.Table('user_dump',
                     db.Column('user_id', db.ForeignKey("users.id")),
                     db.Column('dump_id', db.ForeignKey("dumps.id"))
                     )


@dataclass
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    rating = db.Column(db.Integer, default=0)
    number_confirmed_dumps = db.Column(db.Integer, default=0)
    number_false_dumps = db.Column(db.Integer, default=0)

    dumps = db.relationship("Dump", secondary=user_dump, back_populates="users")

    # что в json
    id:       int
    username: str
    rating:   int
    number_confirmed_dumps: int
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


@dataclass
class Dump(db.Model):
    __tablename__ = 'dumps'
    id = db.Column(db.Integer, unique=True, primary_key=True, autoincrement=True)
    longitude = db.Column(db.String(16))
    latitude = db.Column(db.String(16))
    description = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.now())
    status = db.Column(db.Integer, default=0)

    users = db.relationship("User", secondary=user_dump, back_populates="dumps")

    # для json
    id: int
    status: int
    date: field(default_factory=datetime.utcnow)


# class RevokedTokenModel(db.Model):
#     __tablename__ = 'revoked_tokens'
#     id = db.Column(db.Integer, primary_key=True)
#     jti = db.Column(db.String(120))
#
#     def add(self):
#         db.session.add(self)
#         db.session.commit()
#
#     @classmethod
#     def is_jti_blacklisted(cls, jti):
#         query = cls.query.filter_by(jti=jti).first()
#         return bool(query)
