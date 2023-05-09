from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
app.secret_key = b'R\x83\ru\xf0\xe2\x92A\xad\x922Z\x19y\xc4n'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db = SQLAlchemy()

bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
