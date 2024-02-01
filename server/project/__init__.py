#   Imports externos
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from dotenv import load_dotenv 
import os

load_dotenv("../../.env")
load_dotenv("/etc/secrets/.env")
SECRET_JWT_KEY = os.environ.get("SECRET_JWT_KEY")

#   DEBBUGING
print("KEY:", SECRET_JWT_KEY)
if SECRET_JWT_KEY is None: SECRET_JWT_KEY = "123123123"
    
ALGORITHM = "HS256"
EXPIRATION_TIME = timedelta(days=1)

IMAGE_API_KEY = os.environ.get("IMAGE_API_KEY")
IMAGE_API_URl = "https://api.imgbb.com/1/upload"

DATABASE_NAME = os.environ.get("DATABASE_NAME")
DATABASE_HOST = os.environ.get("DATABASE_HOST")
DATABASE_USER = os.environ.get("DATABASE_USER")
DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")
DATABASE_PORT = os.environ.get("DATABASE_PORT")
DATABASE_ENGINE = "postgresql+psycopg2"
DATABASE_CONECTION = f"{DATABASE_ENGINE}://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}?sslmode=require"

if DATABASE_NAME is None:
    DATABASE_CONECTION = "sqlite:///db.sqlite3"


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
