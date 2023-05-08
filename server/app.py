import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request, make_response
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

class Pets(Resource):
    def get(self):
        pets = [pet.to_dict() for pet in Pet.query.all()]
        return make_response(pets, 200)

api.add_resource(Pets, '/pets')

class Shelters(Resource):
    def get(self):
        shelters = [shelter.to_dict() for shelter in Shelter.query.all()]
        return make_response(shelters, 200)
    
api.add_resource(Shelters, '/shelters')

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)
    
api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)