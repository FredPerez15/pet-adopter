from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask import Flask, abort
from flask_sqlalchemy import SQLAlchemy
import os

from dotenv import load_dotenv
load_dotenv()


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
    )

app.secret_key = b'R\x83\ru\xf0\xe2\x92A\xad\x922Z\x19y\xc4n'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
