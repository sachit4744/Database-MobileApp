from flask import Blueprint, request, redirect, url_for, render_template, flash

from models.users import User

from services.database_service import DatabaseService

request_blueprint = Blueprint('request', __name__, template_folder="templates")


@request_blueprint.route('/request', methods=['POST'])
def request_function():
    print("Request Received")

    # print("REQUEST", request.data)

    request_data = dict(request.json)
    # Query and Get Data with AWS
    #
    #

    if request_data['isSqlBtn']:
        # Execute in SQL Table
        dataset = ""
        if request_data['isInstaCart']:
            dataset = "InstaCart"
            res_temp = DatabaseService().execute_mysql_query('use Instacart;')
        else:
            dataset = "ABC"
            res_temp = DatabaseService().execute_mysql_query('use ABC;')
        response = DatabaseService().execute_mysql_query(
            request_data['query'])
    elif request_data['isRsBtn']:
        # Execute RS Table
        dataset = ""
        if request_data['isInstaCart']:
            dataset = "InstaCart"
            res_temp = DatabaseService().execute_redshift_query('set search_path to public;')
        else:
            dataset = "ABC"
            res_temp = DatabaseService().execute_redshift_query('set search_path to abc1;')
        response = DatabaseService().execute_redshift_query(
            request_data['query'])

    return response
