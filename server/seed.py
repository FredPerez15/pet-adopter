# from random import choice as rc, randint

# from faker import Faker

# from app import app
# from models import db, Pet, Shelter

# fake = Faker()

# # def make_shelters():

# #     Shelter.query.delete()

# #     shelters = []
    
# #     for i in range(5):
# #         shelter = Shelter(
# #             name = fake.name(),
# #             address = fake.address()
# #         )

# #         shelters.append(shelter)

# #         db.session.add_all(shelters)
# #         db.session.commit()


# def make_pets():

#     Pet.query.delete()

#     pets = []
#     cat_breeds = ["Sphynx", "American Shorthair", "Abyssinian", "Burmese Cat", "Birman"]
#     dog_breeds = ["German Shepherd", "Husky", "Pitbull", "Golden Retriever", "Shiba", "Alaskan Malamute"]

#     for i in range(20):
#         cat = Pet(
#             name = fake.name(),
#             animal = "Cat",
#             breed = rc(cat_breeds),
#             age = randint(1, 10),
#             shelter_id = randint(1, 5)
#         )
#         pets.append(cat)

#         dog = Pet(
#             name = fake.name(),
#             animal = "Dog",
#             breed = rc(dog_breeds),
#             age = randint(1, 10),
#             shelter_id = randint(1, 5)
#         )
#         pets.append(dog)        

#         db.session.add_all(pets)
#         db.session.commit()

# if __name__ == '__main__':
#     with app.app_context():
#         # make_shelters()
#         make_pets()
