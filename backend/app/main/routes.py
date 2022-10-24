from app.main import api
from app.main.resources import DumpResource, DumpListResource

api.add_resource(DumpResource, '/dump')
api.add_resource(DumpListResource, '/dumps')
