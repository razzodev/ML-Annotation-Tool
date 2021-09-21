from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

db_ip = os.environ.get('db_ip')
db_port = os.environ.get('db_port')
db_password = os.environ.get('db_password')
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{db_password}@{db_ip}:{db_port}/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True)
    password = db.Column(db.String())
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    email = db.Column(db.String())
    user_type = db.Column(db.String())
    created = db.Column(db.String())


    def __init__(self, username, password, first_name, last_name, email, user_type, created):
        self.username = username
        self.password = password
        self.first_name = first_name 
        self.last_name = last_name 
        self.email = email 
        self.user_type = user_type 
        self.created = created

    def __repr__(self):
        return '<User %r>' % self.username