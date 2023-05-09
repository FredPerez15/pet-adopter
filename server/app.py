from models import User, Shelter, Review, Pet
from config import api, app, db
from flask_restful import Resource
from flask import request, make_response, session


class Signup(Resource):
    def post(self):
        json = request.get_json()
        password = json['password']
        user = User(
            username=json['username'],
            avatar=json['avatar'],
            age=json['age']
        )
        user.password_hash = password
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except Exception as ex:
            return make_response({"errors": [ex.__str__()]}, 422)


api.add_resource(Signup, '/signup')


class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401


api.add_resource(CheckSession, '/check_session')


class Login(Resource):
    def post(self):
        json = request.get_json()
        username = json['username']
        password = json['password']
        user = User.query.filter(User.username == username)
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {'error': 'Invalid username or password'}, 401


api.add_resource(Login, '/login')


class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204

        return {'error': '401 Unauthorized'}, 401


api.add_resource(Logout, '/logout')


class Pets(Resource):
    def get(self):
        if session.get('user_id'):
            pets = [pet.to_dict() for pet in Pet.query.all()]
            return make_response(pets, 200)
        return {'error': '401 Unauthorized'}, 401

    def post(self):
        if session.get('user_id'):
            data = request.get_json()
            try:
                new_pet = Pet(
                    name=data['name'],
                    age=data['age'],
                    animal=data['animal'],
                    breed=data['breed'],
                    user_id=session['user_id'],
                    shelter_id=data['shelter_id']
                )
                db.session.add(new_pet)
                db.session.commit()
                return make_response(new_pet.to_dict(), 201)
            except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 400)
        return {'error': '401 Unauthorized'}, 401


api.add_resource(Pets, '/pets')


class PetById(Resource):
    def patch(self, id):
        if session.get('user_id'):
            data = request.get_json()
            pet = Pet.query.filter_by(id=id).first()
            if not pet:
                return make_response({"error": "pet not found"}, 400)
            for attr in data:
                setattr(pet, attr, data[attr])
            db.session.add(pet)
            db.session.commit()
            return make_response(pet.to_dict(), 202)
        return {'error': '401 Unauthorized'}, 401


api.add_resource(PetById, '/pets/<int:id>')


class Shelters(Resource):
    def get(self):
        if session.get('user_id'):
            shelters = [shelter.to_dict() for shelter in Shelter.query.all()]
            return make_response(shelters, 200)
        return {'error': '401 Unauthorized'}, 401


api.add_resource(Shelters, '/shelters')


class Reviews(Resource):
    def get(self):
        if session.get('user_id'):
            reviews = [review.to_dict() for review in Review.query.all()]
            return make_response(reviews, 200)
        return {'error': '401 Unauthorized'}, 401

    def post(self):
        if session.get('user_id'):
            data = request.get_json()
            try:
                new_review = Review(
                    body=data['body'],
                    user_id=session['user_id'],
                    shelter_id=data['shelter_id']
                )
                db.session.add(new_review)
                db.session.commit()
            except Exception as ex:
                return make_response({"errors": [ex.__str__()]}, 400)
            return make_response(new_review.to_dict(), 201)
        return {'error': '401 Unauthorized'}, 401


api.add_resource(Reviews, '/reviews')


class ReviewById(Resource):
    def patch(self, id):
        if session.get('user_id'):
            data = request.get_json()
            review = Review.query.filter_by(id=id).first()
            if not review:
                return make_response({"error": "review not found"}, 400)
            for attr in data:
                setattr(review, attr, data[attr])
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 202)
        return {'error': '401 Unauthorized'}, 401

    def delete(self, id):
        if session.get('user_id'):
            review = Review.query.filter_by(id=id).first()
            if not review:
                return make_response({"error": "review does not exist"})
            db.session.delete(review)
            db.session.commit()
            return make_response('', 200)
        return {'error': '401 Unauthorized'}, 401


api.add_resource(ReviewById, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
