import os


class SetupConfig:

    def __init__(self, app):
        app.config['DEBUG'] = True
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
            "SQLALCHEMY_DATABASE_URI", None)
        app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        app.config['MAIL_PORT'] = 465
        app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME", None)
        app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD", None)
        app.config['MAIL_USE_TLS'] = False
        app.config['MAIL_USE_SSL'] = True
        app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", None)
