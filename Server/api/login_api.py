from flask import Blueprint, request, redirect, url_for, render_template, flash
from werkzeug.security import check_password_hash

from models.users import User

login_blueprint = Blueprint('login', __name__, template_folder="templates")


@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        return {"message": "Successful Request"}, 200

    elif request.method == 'GET':
        return {"message": "Invalid Request"}, 400
