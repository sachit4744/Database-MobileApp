from services.database_service import DatabaseService
from initializers.register_all_blueprints import RegisterBlueprints
from initializers.environment_config import EnvironmentConfig
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager
)
from flask_mail import Mail
from flask_migrate import Migrate
from werkzeug.middleware.proxy_fix import ProxyFix

from database import db

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_port=1)

with app.app_context():
    from initializers.setup_config import SetupConfig
    # EnvironmentConfig().development_server()
    SetupConfig(app)
    db.init_app(app)
    migrate = Migrate(app, db, compare_type=True)
    migrate.init_app(app, db)
    mail = Mail(app)
    CORS(app)
    jwt = JWTManager(app)
    RegisterBlueprints(app)
    DatabaseService.create_connection()
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.run(host="0.0.0.0", port=5002,)

    print("Server Running")
