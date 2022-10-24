from app.admin_panel import api
from app.admin_panel.resources import ChangeDumpStatusResource

api.add_resource(ChangeDumpStatusResource, '/admin_panel/change_dumb_status/<int:dump_id>')
