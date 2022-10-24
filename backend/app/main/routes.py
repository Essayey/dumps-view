from app.main import api
from app.main.resources import DumpResource, DumpListResource

api.add_resource(DumpResource, '/dump/<int:dump_id>')
api.add_resource(DumpListResource, '/dumps')
