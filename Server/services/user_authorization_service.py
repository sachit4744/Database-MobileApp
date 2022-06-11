from flask_jwt_extended import verify_jwt_in_request
from functools import wraps


class UserAuthorizationService:
    def login_required(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            return fn(*args, **kwargs)

        return wrapper
