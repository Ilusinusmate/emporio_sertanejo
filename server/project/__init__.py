#   Imports externos
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emporio_sertanejo.db'
db = SQLAlchemy(app)

#   Inicializar projeto
from project import database
from project import models
from project import routes
from project import payments
from project import validations

if __name__ == "__main__":
    db.create_all()