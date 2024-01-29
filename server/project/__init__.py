#   Imports externos
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from os import getenv

SECRET_JWT_KEY = getenv("SECRET_JWT_KEY")
ALGORITHM = "HS256"
EXPIRATION_TIME = timedelta(days=1)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#   Inicializar projeto
from server.project import models
from server.project import schemas
from server.project import database
from server.project import utils
from server.project import oauth2

from .routers import users, auth, employees, products

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(products.router)
