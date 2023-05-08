import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Shelter, Review, Pet

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api=Api(app)

if __name__ == '__main__':
    app.run(port=5555, debug=True)