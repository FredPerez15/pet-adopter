import os

from dotenv import load_dotenv
load_dotenv()
from flask_bcrypt import Bcrypt

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
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api=Api(app)

class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username)

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401

api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

class Pets(Resource):
    def get(self):
        pets = [pet.to_dict() for pet in Pet.query.all()]
        return make_response(pets, 200)

    def post(self):
        data = request.get_json()
        try:
            new_pet = Pet(
                name = data['name'],
                age = data['age'],
                animal = data['animal'],
                breed = data['breed'],
                user_id = data['user_id'],
                shelter_id = data['shelter_id']
            )
            db.session.add(new_pet)
            db.session.commit()
        except Exception as ex:
            return make_response({"errors": [ex.__str__()]}, 400)
        return make_response(new_pet.to_dict(), 201)

api.add_resource(Pets, '/pets')

class PetById(Resource):
    def patch(self, id):
        data = request.get_json()
        pet = Pet.query.filter_by(id=id).first()
        if not pet:
            return make_response({"error": "pet not found"}, 400)
        for attr in data:
            setattr(pet, attr, data[attr])
        db.session.add(pet)
        db.session.commit()
        return make_response(pet.to_dict(), 202)

api.add_resource(PetById, '/pets/<int:id>')

class Shelters(Resource):
    def get(self):
        shelters = [shelter.to_dict() for shelter in Shelter.query.all()]
        return make_response(shelters, 200)
    
api.add_resource(Shelters, '/shelters')

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)

    def post(self):
        data = request.get_json()
        try:
            new_review = Review(
                body = data['body'],
                user_id = data['user_id'],
                shelter_id = data['shelter_id']
            )
            db.session.add(new_review)
            db.session.commit()
        except Exception as ex:
            return make_response({"errors": [ex.__str__()]}, 400)
        return make_response(new_review.to_dict(), 201)
    
api.add_resource(Reviews, '/reviews')

# verify session with user ID and review belongs to user
class ReviewById(Resource):
    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({"error": "review not found"}, 400)
        for attr in data:
            setattr(review, attr, data[attr])
        db.session.add(review)
        db.session.commit()
        return make_response(review.to_dict(), 202)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({"error": "review does not exist"})
        db.session.delete(review)
        db.session.commit()
        return make_response('', 200)

api.add_resource(ReviewById, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)