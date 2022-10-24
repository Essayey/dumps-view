from app.main import api
from app.main.resources import DumpResource

api.add_resource(DumpResource, '/dump/<int:dump_id>')
