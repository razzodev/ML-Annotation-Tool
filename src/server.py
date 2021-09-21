from datetime import datetime
from flask import Flask, redirect, request, session, url_for, jsonify, render_template, send_from_directory
from flask_cors import CORS
import json
from flask_bcrypt import Bcrypt
import requests
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from lib2to3.refactor import _identity
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from sqlalchemy import create_engine,update ,Table, Column, String, MetaData, Integer, Text
from sqlalchemy.dialects.postgresql import BYTEA , JSON
import psycopg2
import os
from faker import Faker
fake = Faker()

import resources
from model import User,db

app = Flask(__name__)
db_ip = os.environ.get('db_ip')
db_port = os.environ.get('db_port')
db_password = os.environ.get('db_password')
lev_dist = os.environ.get('lev_dist')
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{db_password}@{db_ip}:{db_port}/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'Algo-secret-key'  #WHAT SHOULD THE KEY BE?!

db_string = f"postgresql://postgres:{db_password}@{db_ip}:{db_port}/postgres"

db = create_engine(db_string)

SQLAlchemy_db = SQLAlchemy(app)
SQLAlchemy_db.init_app(app)
jwt = JWTManager(app)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app)
meta = MetaData(db)  


@app.route('/')
def index():
    print("ok")
    return 'Hello, World!'


api.add_resource(resources.UserLogin, '/login/verify')

users_table = Table('users', meta,  
	Column('id', String),
	Column('first_name', String),
	Column('last_name', String),
	Column('email', String),
	Column('username', String),
	Column('password', String),
	Column('user_type', String),
	Column('created', String))


@app.route('/addusers', methods=['POST'])
def add_new_user():
	new_user = request.get_json()
	print(new_user)
	new_user_username = new_user['username']
	new_user_first_name = new_user['first_name']
	new_user_last_name = new_user['last_name']
	new_user_email = new_user['email']
	new_user_password = bcrypt.generate_password_hash(new_user['password']).decode('utf-8')
	if User.query.filter(User.username==new_user_username).first():
		print("user already exists")
		# return json.dumps("User already exists")	

	with db.connect() as conn:

    	# Read table/generate ID
		select_statement = users_table.select()
		result_set = conn.execute(select_statement)
		id_list=[]
		for r in result_set:
			id_list.append(r['id'])
		new_user_id = int(max(id_list)) + 1

    	# Add regular user # timestamp = datetime.timestamp(now)
		if new_user_username != '' and new_user_password != '' and new_user_first_name != '' and new_user_last_name != '' and new_user_email != '':
			insert_statement = users_table.insert().values(id= new_user_id, username=new_user_username, first_name=new_user_first_name, last_name=new_user_last_name, email=new_user_email, password= new_user_password, user_type="regular", created=datetime.now())
			conn.execute(insert_statement)
			
	return new_user


def multiply_columns(name_list,suffix_list):
    full_list = []
    for column in name_list:
        for suff in suffix_list:
            full_list.append(column+suff)
    return full_list

logs_categories = ['account','date','digital_sign','doc_new_id','doc_old_id','doc_sefah','first_page','footer','full_account','id','passport','title']
logs_suffix = ['_val', '_loc','_stat']

logs_columns = multiply_columns(logs_categories,logs_suffix)

logs_table = Table('logs', meta,
    *(Column(column_name, String) for column_name in logs_columns),
    Column('file',String))


def intoStr(list):
    value = ', '.join(list)
    return value

with db.connect() as conn:
    # # # Create
    # logs_table.create()

    # run script   #  fake.pystr(min_chars=None, max_chars=20),filename=fake.word(ext_word_list=None), _val=fake.century()
    # # for x in range(100):
    # for column in all_columns:
    #     value = fake.pystr(min_chars=None, max_chars=20)
    #     insert_list.append(value)
    #     print(type(value))

    populate_cols = logs_table.insert().values(
        account_val=fake.name(),
        account_loc=fake.pystr(min_chars=None, max_chars=20),
        account_stat=fake.pystr(min_chars=None, max_chars=20),
        date_val=fake.date(),
        date_loc=fake.pystr(min_chars=None, max_chars=20),
        date_stat=fake.pystr(min_chars=None, max_chars=20),
        digital_sign_val=fake.boolean(),
        digital_sign_loc=fake.pystr(min_chars=None, max_chars=20),
        digital_sign_stat=fake.pystr(min_chars=None, max_chars=20),
        doc_new_id_val=fake.random_int(),
        doc_new_id_loc=fake.pystr(min_chars=None, max_chars=20),
        doc_new_id_stat=fake.pystr(min_chars=None, max_chars=20),
        doc_old_id_val=fake.random_int(),
        doc_old_id_loc=fake.pystr(min_chars=None, max_chars=20),
        doc_old_id_stat=fake.pystr(min_chars=None, max_chars=20),
        doc_sefah_val=fake.boolean(),
        doc_sefah_loc=fake.pystr(min_chars=None, max_chars=20),
        doc_sefah_stat=fake.pystr(min_chars=None, max_chars=20),
        first_page_val=fake.boolean(),
        first_page_loc=fake.pystr(min_chars=None, max_chars=20),
        first_page_stat=fake.pystr(min_chars=None, max_chars=20),
        footer_val=fake.boolean(),
        footer_loc=fake.pystr(min_chars=None, max_chars=20),
        footer_stat=fake.pystr(min_chars=None, max_chars=20),
        full_account_val=fake.name(),
        full_account_loc=fake.pystr(min_chars=None, max_chars=20),
        full_account_stat=fake.pystr(min_chars=None, max_chars=20),
        id_val=fake.random_int(),
        id_loc=fake.pystr(min_chars=None, max_chars=20),
        id_stat=fake.pystr(min_chars=None, max_chars=20),
        passport_val=fake.phone_number(),
        passport_loc=fake.pystr(min_chars=None, max_chars=20),
        passport_stat=fake.pystr(min_chars=None, max_chars=20),
        title_val=fake.word(ext_word_list=None),
        title_loc=fake.word(ext_word_list=None),
        title_stat=fake.pystr(min_chars=None, max_chars=20),
        file=fake.file_name(),)
    # conn.execute(populate_cols)

    #insert row
    # insert_statement = docs_table.insert().values(filename="yetAnotherFile", detected_at="2019-11-24-08:33:11", status='Failed', number_of_pages=13)
    # conn.execute(insert_statement)

    # # Read
    # select_statement = docs_table.select()
    # result_set = conn.execute(select_statement)
    # for r in result_set:
    #     print('>>>>>',r)

    # # Update
    # update_statement = docs_table.update().where(docs_table.c.year=="2016").values(title = "Some2016Film")
    # conn.execute(update_statement)

    # # Delete
    # delete_statement = docs_table.delete()
    # conn.execute(delete_statement)
    pass


@app.route('/get_docs')
def get_docs():
    with db.connect() as conn:
        get_all = conn.execute("SELECT * FROM logs")
        result = get_all.fetchall()
        new_data = []
        for i, row in enumerate(result, 0):
            new_row = {}
            new_row['account_val'] = row[0]
            new_row['date_val'] = row[3]
            new_row['digital_sign_val'] = row[6]
            new_row['doc_new_id_val'] = row[9]
            new_row['doc_old_id_val'] = row[12]
            new_row['doc_sefah_val'] = row[15]
            new_row['first_page_val'] = row[18]
            new_row['footer_val'] = row[21]
            new_row['full_account_val'] = row[24]
            new_row['id_val'] = row[27]
            new_row['passport_val'] = row[30]
            new_row['title_val'] = row[33]
            new_row['file'] = row[36]
            new_data.insert(i,new_row)
    return json.dumps(new_data)

@app.route('/search_docs', methods=['POST'])
def search_docs():
    searchInput = request.get_json()
    global intoStr, logs_columns, lev_dist
    print(searchInput)
    if 'searchValue' in searchInput:
        if searchInput['searchValue'] == "":
            with db.connect() as conn:
                get_all = conn.execute("SELECT * FROM logs")
                result = get_all.fetchall()
        else:
            query = searchInput['searchValue']
            print(lev_dist)
            with db.connect() as conn:
                levenstein_loop = ''
                for i, col in enumerate(logs_categories, 0):
                    is_OR = 'OR' if i+1 < len(logs_categories) else ''
                    levenstein_loop += f"levenshtein({col}_val, '{query}') < {int(lev_dist)} {is_OR} "
                search = conn.execute(f"SELECT * FROM logs WHERE {levenstein_loop}")
                # search = conn.execute((f"SELECT * FROM logs WHERE levenshtein(date_val, '{query}') <= {int(lev_dist)}"))
                result = search.fetchall()
                print(result)
    else:
        columns = []
        queries = []
        account_val_q = searchInput['account_val']
        if account_val_q != '':
            columns.append('account_val')
            queries.append("'" + account_val_q + "'")
        date_val_q = searchInput['date_val']
        if date_val_q != '':
            columns.append('date_val')
            queries.append("'" + date_val_q + "'")
        digital_sign_val_q = searchInput['digital_sign_val']
        if digital_sign_val_q != '':
            columns.append('digital_sign_val')
            queries.append("'" + digital_sign_val_q + "'")
        doc_new_id_val_q = searchInput['doc_new_id_val']
        if doc_new_id_val_q != '':
            columns.append('doc_new_id_val')
            queries.append("'" + doc_new_id_val_q + "'")
        first_page_val_q = searchInput['first_page_val']
        if first_page_val_q != '':
            columns.append('first_page_val')
            queries.append("'" + first_page_val_q + "'")
        footer_val_q = searchInput['footer_val']
        if footer_val_q != '':
            columns.append('footer_val')
            queries.append("'" + footer_val_q + "'")
        filename_q = searchInput['filename']
        if filename_q != '':
            columns.append('filename')
            queries.append("'" + filename_q + "'")
        filter_q = []
        if len(columns) > 0:
            for i in range(len(columns)):
                filter_q.append(f"levenshtein({columns[i]}, {queries[i]}) <= {int(lev_dist)} AND ")
            last = filter_q.pop(-1)
            last = last[:-5]
            filter_q.append(last)
            filter_q = "".join(filter_q)
            print(filter_q)
            with db.connect() as conn:
                search = conn.execute(f"SELECT * FROM logs WHERE  + {filter_q}")
                result = search.fetchall()
        else:
            with db.connect() as conn:
                get_all = conn.execute("SELECT * FROM logs")
                result = get_all.fetchall()

    new_data = []
    for i, row in enumerate(result, 0):
        new_row = {}
        new_row['account_val'] = row[0]
        new_row['date_val'] = row[3]
        new_row['digital_sign_val'] = row[6]
        new_row['doc_new_id_val'] = row[9]
        new_row['doc_old_id_val'] = row[12]
        new_row['doc_sefah_val'] = row[15]
        new_row['first_page_val'] = row[18]
        new_row['footer_val'] = row[21]
        new_row['full_account_val'] = row[24]
        new_row['id_val'] = row[27]
        new_row['passport_val'] = row[30]
        new_row['title_val'] = row[33]
        new_row['file'] = row[36]
        new_data.insert(i,new_row)
    return json.dumps(new_data) 

    #     new_data = []        #                                  DO WE NEED THIS ? 
    #     for i, row in enumerate(result, 0):
    #         new_row = {}
    #         new_row['account_val'] = row[0]
    #         new_row['account_loc'] = row[1]
    #         new_row['account_stat'] = row[2]
    #         new_row['date_val'] = row[3]
    #         new_row['date_loc'] = row[4]
    #         new_row['date_stat'] = row[5]
    #         new_row['digital_sign_val'] = row[6]
    #         new_row['digital_sign_loc'] = row[7]
    #         new_row['digital_sign_stat'] = row[8]
    #         new_row['doc_new_id_val'] = row[9]
    #         new_row['doc_new_id_loc'] = row[10]
    #         new_row['doc_new_id_stat'] = row[11]
    #         new_row['first_page_val'] = row[12]
    #         new_row['first_page_loc'] = row[13]
    #         new_row['first_page_stat'] = row[14]
    #         new_row['footer_val'] = row[15]
    #         new_row['footer_loc'] = row[16]
    #         new_row['footer_stat'] = row[17]
    #         new_row['filename'] = row[18]
    #         new_row['_val'] = row[19]
    #         new_data.insert(i,new_row)
    #     return json.dumps(new_data)
    # else:
    #     return None
 
new_docs_table = Table('new_docs', meta,  
    Column('doc_name', String),
    Column('file', Text),
    Column('json', JSON ),
    Column('pages', String),
    Column('timestamp', String),
    Column('username', String),
    )

@app.route('/update_form', methods=['PUT'])
def update_form():
    form = request.get_json()
    file_blob = form['base64']
    with db.connect() as conn:
        insert_statement = update(new_docs_table).values(doc_name=form['name'],
            json=json.dumps(form),
            file=form['base64'],
            pages=form['numPages'],
            timestamp=datetime.now().isoformat(),
            username=form['username']).\
                where(new_docs_table.c.file==file_blob)
        conn.execute(insert_statement)
        return json.dumps(form)

@app.route('/add_new_form', methods=['POST'])
def add_new_form():
    form = request.get_json()
    with db.connect() as conn:
        insert_statement = new_docs_table.insert().values(
            doc_name=form['name'],
            json=json.dumps(form),
            file=form['base64'],
            pages=form['numPages'],
            timestamp=datetime.now().isoformat(),
            username=form['username'])
        conn.execute(insert_statement)
    return json.dumps(form)

@app.route('/manage_forms')
def manage_forms():
    table_name = 'new_docs'
    with db.connect() as conn:
        get_all = conn.execute(f"SELECT doc_name, username, pages, timestamp FROM {table_name}")
        result = get_all.fetchall()
        return jsonify([dict(row) for row in result])

@app.route('/get_form_blob')
def get_form_blob():
    name = request.args.get('doc_name')
    with db.connect() as conn:
        get_all = conn.execute(f"SELECT json FROM new_docs WHERE doc_name = '{name}'")
        result = get_all.fetchall()
        return jsonify([dict(row) for row in result])


if __name__ == "__main__":
    app.run(host="0.0.0.0", use_reloader=True, threaded=True, port=5000, debug=True)

