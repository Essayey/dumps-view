from datetime import datetime
from app import db
from passlib.hash import pbkdf2_sha256 as sha256
from dataclasses import dataclass, field
from os import path, getcwd

user_dump = db.Table('user_dump',
                     db.Column('user_id', db.ForeignKey("users.id")),
                     db.Column('dump_id', db.ForeignKey("dumps.id"))
                     )

user_role = db.Table('user_role',
                     db.Column('user_id', db.ForeignKey("users.id")),
                     db.Column('role_id', db.ForeignKey("roles.id"))
                     )


@dataclass
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    number_confirmed_dumps = db.Column(db.Integer, default=0)
    number_false_dumps = db.Column(db.Integer, default=0)

    dumps = db.relationship("Dump", secondary=user_dump, back_populates="users")
    roles = db.relationship("Role", secondary=user_role, back_populates="users")

    # что в json
    id: int
    username: str
    rating: int
    number_confirmed_dumps: int

    @property
    def rating(self):
        return self.number_confirmed_dumps - self.number_false_dumps

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)
    users = db.relationship("User", secondary=user_role, back_populates="roles")


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
    longitude: str
    latitude: str
    status: int
    date: field(default_factory=datetime.utcnow)
    number_confirmations: int
    user_rating: int
    img_url: str

    @property
    def number_confirmations(self):
        return len(self.users)

    @property
    def user_rating(self):
        if users := self.users:
            return users[0].rating

    @property
    def img_url(self):
        print(path.exists(getcwd() + f'/app/static/dumps/{self.id}.jpg'))
        if url := path.exists(f'/static/dumps/{self.id}.jpg'):
            return url
        return ''

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
