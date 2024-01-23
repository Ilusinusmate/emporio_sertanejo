#   Imports externos
from fastapi import FastAPI
from dotenv import load_dotenv
from datetime import timedelta
from os import getenv

load_dotenv()

SECRET_JWT_KEY = getenv("SECRET_JWT_KEY")
ALGORITHM = "HS256"
EXPIRATION_TIME = timedelta(days=1)

app = FastAPI()


#   Inicializar projeto
from project import models
from project import schemas
from project import database
from project import utils
from project import oauth2

from .routers import users, auth, employees, products

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(products.router)
