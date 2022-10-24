from app.auth import api
from app.auth.resources import UserRegistrationResource, UserLoginResource


api.add_resource(UserRegistrationResource, '/user/registration')
api.add_resource(UserLoginResource, '/user/login')
