from api.login_api import login_blueprint
from api.request_api import request_blueprint


class RegisterBlueprints:

    def __init__(self, app):
        app.register_blueprint(login_blueprint)
        app.register_blueprint(request_blueprint)
