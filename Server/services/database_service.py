import psycopg2
import jsonify
import mysql.connector
from flask import jsonify

import time


class DatabaseService:

    MySqlConnection = None
    RedShiftConnection = None

    def execute_common_query(self, query, database, dataset):
        print("EXECUTING COMMON QUERY")
        print(query)
        conn = DatabaseService.get_connection(database)
        cursor = conn.cursor()

        t1 = time.time()

        try:
            cursor.execute(query)
        except Exception as err:
            return {"Response": str(err), "Status": 406}
        conn.commit()
        t2 = time.time()

        t = t2 - t1

        print(t)

        return jsonify({"ElapsedTime": t*1000, "Status": 200})


    def execute_redshift_query(self, query):

        print("EXECUTING REDSHIFT")

        conn = DatabaseService.get_connection("REDSHIFT")
        cursor = conn.cursor()
        # print(dataset)
        # if(dataset=="InstaCart"):
        #     cursor.execute('set search_path to public;')
        # else:
        #     cursor.execute('set search_path to abc;')
        # conn.commit()
        # print(cursor.fetchall())

        t1 = time.time()

        try:
            cursor.execute(query)
        except Exception as err:
            return {"Response": str(err), "Status": 406}

        answer = {}
        cols = {}

        if cursor.pgresult_ptr is not None:
            answer = cursor.fetchall()
            cols = [desc[0] for desc in cursor.description]
        # answer = cursor.fetchall()
        # # cols = cursor.column_names
        # cols = [desc[0] for desc in cursor.description]

        t2 = time.time()

        t = t2 - t1

        print(t)

        return jsonify({"Header": cols, "Response": answer, "ElapsedTime": round(t*1000, 3), "Status": 200})

    def execute_mysql_query(self, query):

        conn = DatabaseService.get_connection("MYSQL")
        cursor = conn.cursor()
        # print(dataset)
        # if(dataset=="InstaCart"):
        #     cursor.execute("use Instacart;")
        # else:
        #     cursor.execute("use ABC;")
        # conn.commit()
        # print(cursor.fetchall())

        t1 = time.time()

        try:
            cursor.execute(query)
        except Exception as err:
            print(err)
            return {"Response": err.msg, "Status": 406}

        # answer = {}
        # cols = {}

        # if cursor.pgresult_ptr is not None:
        #     answer = cursor.fetchall()
        #     cols = cursor.column_names
        answer = cursor.fetchall()
        cols = cursor.column_names
        # answer.insert(0,cursor.column_names)
        # res = [dict(zip(cols, row)) for row in answer]

        t2 = time.time()

        t = t2 - t1
        print(t)

        return jsonify({"Header": cols, "Response": answer, "ElapsedTime": round(t*1000, 3), "Status": 200})

    @staticmethod
    def get_credentials(database):

        if database == "MYSQL":

            ENDPOINT = "rutgersdatabase.c3evtogdubqe.us-east-1.rds.amazonaws.com"
            PORT = 3306
            USER = "RutgersDataBase"
            PASSWORD = "Rutgers456"
            REGION = "us-east-1a"
            DBNAME = "Instacart"

            return ENDPOINT, PORT, USER, PASSWORD, REGION, DBNAME

        elif database == "REDSHIFT":
            ENDPOINT = "rutgersdbmsproject.c3h5sc0bvfmu.us-east-1.redshift.amazonaws.com"
            PORT = 5439
            USER = "rutgersdatabase"
            PASSWORD = "Rutgers456"
            REGION = "us-east-1"
            DBNAME = "instacart"
            return ENDPOINT, PORT, USER, PASSWORD, REGION, DBNAME
            # return ENDPOINT, PORT, USER, PASSWORD, REGION, DBNAME

    @staticmethod
    def create_connection():

        try:
            ENDPOINT, PORT, USER, PASSWORD, REGION, DBNAME = DatabaseService.get_credentials(
                "REDSHIFT")
            conn = psycopg2.connect(
                host=ENDPOINT,
                port=PORT,
                user=USER,
                database=DBNAME,
                password=PASSWORD)

            conn.autocommit = True
            DatabaseService.RedShiftConnection = conn

        except Exception as err:
            print(err.code, err)

        try:
            ENDPOINT, PORT, USER, PASSWORD, REGION, DBNAME = DatabaseService.get_credentials(
                "MYSQL")
            conn = mysql.connector.connect(
                host=ENDPOINT,
                port=PORT,
                user=USER,
                database=DBNAME,
                password=PASSWORD)
            DatabaseService.MySqlConnection = conn

        except Exception as err:
            print(err.code, err)

    @staticmethod
    def get_connection(database):

        if(database == "MYSQL"):
            if DatabaseService.MySqlConnection == None:
                DatabaseService.create_connection()
            conn = DatabaseService.MySqlConnection
        else:
            if DatabaseService.RedShiftConnection == None:
                DatabaseService.create_connection()
            conn = DatabaseService.RedShiftConnection
        return conn
