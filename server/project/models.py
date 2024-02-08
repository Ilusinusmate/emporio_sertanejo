from sqlalchemy import Column, String, Integer, ForeignKey, Text, Float, JSON, Boolean, CheckConstraint, or_
from sqlalchemy.engine import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
import json

from project import DATABASE_CONECTION


Engine = create_engine(DATABASE_CONECTION)
Base = declarative_base()
Session = sessionmaker(bind=Engine, autocommit=False, autoflush=False)
 
class Product(Base):
    
    """ Price should be in BRL and profit in percentage %
    """
    
    __tablename__ = "products"
    id = Column(Integer, autoincrement=True, primary_key=True)
    barcode = Column(String(12), nullable=False)
    name = Column(String(70), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    profit = Column(Float, nullable=False) 
    stock = Column(JSON, default={
        "quantity": 0,
        "type": "grams"
    })
    unit = Column(Integer, nullable=False)
    employee_registered = Column(String, ForeignKey("employees.cpf"), nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    image_link = Column(String, default=None, nullable=True)
    
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, autoincrement=True, primary_key=True)
    username = Column(String(30), nullable=False)
    email = Column(String, nullable=False, unique=True)
    cpf = Column(String(14), nullable=True, unique=True)
    points = Column(Integer, default=0)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    role = Column(Integer, default=2)

class Employee(Base):
    __tablename__ = "employees"
    cpf = Column(String(14), primary_key=True)
    password = Column(String, nullable=False)
    name = Column(String(40))
    role = Column(Integer, default=1)


class Purchase(Base):
    __tablename__ = "purchases"
    id = Column(Integer, autoincrement=True, primary_key=True)
    purchase = Column(JSON, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    discount = Column(Float, nullable=True,default=0)
    employee_registered = Column(ForeignKey("employees.cpf"), nullable=True, default=None)
    user_registered = Column(ForeignKey("users.cpf"), nullable=True, default=None)
    unit = Column(Integer, nullable=False)
    validated = Column(Boolean, default=False)
    payment_method = Column(Integer)
    total_price = Column(Float, nullable=False)
    
    
class Income(Base):
    __tablename__ = "incomes"
    id = Column(Integer, autoincrement=True, primary_key=True)
    purchase = Column(JSON, nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    
    
Base.metadata.create_all(bind=Engine)