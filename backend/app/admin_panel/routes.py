from app.admin_panel import api
from app.admin_panel.resources import ChangeDumpResource

api.add_resource(ChangeDumpResource, '/change_dump_status')
