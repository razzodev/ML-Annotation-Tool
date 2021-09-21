
from flask import Flask
from flask_cors import CORS
from lib2to3.refactor import _identity
from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask_bcrypt import Bcrypt
from model import User, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Table, Column, String, MetaData
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
db_ip = os.environ.get('db_ip')
db_port = os.environ.get('db_port')
db_password = os.environ.get('db_password')
db_string = f"postgresql://postgres:{db_password}@{db_ip}:{db_port}/postgres"
db = create_engine(db_string)
meta = MetaData(db)  

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'Username cannot be blank', required = True)
parser.add_argument('password', help = 'Password cannot be blank', required = True)

users_table = Table('users', meta,
    Column('id', String),
    Column('first_name', String),
    Column('last_name', String),
    Column('username', String),
    Column('user_type', String))

class UserLogin(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            print(data)
            current_user = User.query.filter_by(username = data['username']).first()
            print(current_user)
            # if not current_user:
            #     return {"error":"User not in database. Register as a new user"}
            if bcrypt.check_password_hash(current_user.password, data['password']) == True:
                access_token = create_access_token(identity=data['username'])
                refresh_token = create_refresh_token(identity=data['username'])

                with db.connect() as conn:
    	        
                # # Read table
                    select_statement = users_table.select()
                    result_set = conn.execute(select_statement)
                    user_first_last_name = []
                    for row in result_set:
                        if row['username'] == current_user.username:
                            cu_first_name = row['first_name']
                            cu_last_name = row['last_name']
                            user_type = row['user_type']
                            user_first_last_name.append(cu_first_name[0].upper())
                            user_first_last_name.append(cu_last_name[0].upper())
                    user_initials = user_first_last_name[0]+user_first_last_name[1]

                return {
                    'username': current_user.username,
                    'user_initials': user_initials,
                    'user_type': user_type,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return {'error': 'Wrong credentials'}
        except:
            raise Exception("Cannot login user")