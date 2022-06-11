import os
import yaml


class EnvironmentConfig:

    @classmethod
    def development_server(cls):

        with open("./environment/development.yaml", "r") as stream:
            try:
                variables = dict(yaml.safe_load(stream))

                os.environ['FLASK_ENV'] = variables.get(
                    'ENVIRONMENT', 'development')
                os.environ['SQLALCHEMY_DATABASE_URI'] = variables.get(
                    'DATABASE_URI')
                os.environ['MAIL_USERNAME'] = variables.get(
                    'MAIL_USERNAME', None)
                os.environ['MAIL_PASSWORD'] = variables.get(
                    'MAIL_PASSWORD', None)
                os.environ['SECRET_KEY'] = variables.get('SECRET_KEY', None)

            except yaml.YAMLError as exc:
                print(exc)
