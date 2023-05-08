from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

class User(db.Model, SerializerMixin): 
    __tablename__ = 'users'

    serialize_rules = ('-id', '-email', '-created_at', '-updated_at', '-reviews', '-pets',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    age = db.Column(db.Integer)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship('Review', backref='user', cascade='all, delete, delete-orphan')
    shelters = association_proxy('reviews', 'shelter')

    pets = db.relationship('Pet', backref='user', cascade='all, delete, delete-orphan')
    shelters = association_proxy('pets', 'shelter')

    @validates('username')
    def validate_username(self, key, value):
        if not value and 1 <= value <= 20:
            raise ValueError('Must have a username between 1 and 20 characters')
        return value
    
    @validates('email')
    def validate_email(self, key, value):
        if not value:
            raise ValueError('Must have an email address')
        return value
    
    @validates('age')
    def validate_age(self, key, value):
        if not 18 <= value:
            raise ValueError('Must be at least 18 years old')
        return value

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    serialize_rules = ('-created_at', '-updated_at', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)
    type = db.Column(db.String, nullable=False)
    breed = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Must have a name')
        return value
    
    @validates('type')
    def validate_type(self, key, value):
        if not value:
            raise ValueError('Must have a type')
        return value
    
    @validates('breed')
    def validate_breed(self, key, value):
        if not value:
            raise ValueError('Must have a breed')
        return value

class Shelter(db.Model, SerializerMixin):
    __tablename__ = 'shelters'

    serialize_rules = ('-created_at', '-updated_at', '-reviews', '-pets',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    pets = db.relationship('Pet', backref='shelter', cascade='all, delete, delete-orphan')
    users = association_proxy('pets', 'user')

    reviews = db.relationship('Review', backref='shelter', cascade='all, delete, delete-orphan')
    users = association_proxy('reviews', 'user')

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Must have a name')
        return value
    
    @validates('address')
    def validate_address(self, key, value):
        if not value:
            raise ValueError('Must have an address')
        return value

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-created_at', '-updated_at', )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())