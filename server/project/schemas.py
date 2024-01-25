from pydantic import BaseModel, constr, EmailStr, conint, PositiveInt, PositiveFloat
from pydantic_br import CPFMask
from datetime import datetime
from typing import Optional


#   USER SCHEMAS

class UserCreate(BaseModel):
    username: constr(max_length=30)
    email: EmailStr
    password: str
    cpf: Optional[CPFMask]
    
    class Config:
        json_schema_extra = {
            "example":{
                "username": "João Miguel",
                "email": "joaomiguel@gmail.com",
                "password": "UmaSenhaForte-123",
                "cpf": "123.456.789-09"
            }
        }
    
    
class UserResponse(BaseModel):
    id: PositiveInt
    username: constr(max_length=30)
    email: EmailStr
    
    class Config:
        json_schema_extra = {
            "example":{
                "id": 1,
                "username": "João Miguel",
                "email": "joaomiguel@gmail.com",
            }
        }
    
    class Config:
        from_attributes = True
        

#   AUTH SCHEMAS

class Token(BaseModel):
    jwt_token: str
    created_at: datetime

class TokenData(BaseModel):
    id : Optional[str | int] = None
    
    
#   EMPLOYEE SCHEMA

class EmployeRegister(BaseModel):
    name: constr(max_length=40)
    cpf: CPFMask
    password: str
    
    class Config:
        json_schema_extra = {
            "example":{
                "name": "João Miguel",
                "cpf": "123.456.789-09",
                "password": "UmaSenhaForte-123"
            }
        }
    
class EmployeeLogin(BaseModel):
    cpf: CPFMask
    password: str
    
    class Config:
        json_schema_extra = {
            "example":{
                "cpf": "123.456.789-09",
                "password": "UmaSenhaForte-123"
            }
        }
    
class EmployeeResponse(BaseModel):
    name: str
    cpf: CPFMask
    class Config:
        json_schema_extra = {
            "example":{
                "name": "João Miguel",
                "cpf": "123.456.789-09",
            }
        }


#   PRODUTCS SCHEMAS


class Stock(BaseModel):
    quantity: PositiveInt
    type: constr(strict=True, pattern=r"^(grams|units)$")

    class Config:
        json_schema_extra = {
            "example": {
                "quantity": 100,
                "type": "grams"
            }
        }

class ProductCreate(BaseModel):
    barcode: constr(max_length=12, min_length=12)
    name: constr(max_length=70)
    description: Optional[str]
    price: PositiveFloat
    profit: PositiveFloat
    stock: Stock
    unit: conint(ge=0, le=2)

    class Config:
        json_schema_extra = {
            "example": {
                "barcode": "123456789012",
                "name": "Example Product",
                "description": "Product description",
                "price": 10.5,
                "profit": 0.2,
                "stock": {
                    "quantity": 100,
                    "type": "grams"
                },
                "unit": 1
            }
        }
    
class ProductResponse(ProductCreate):
    id: PositiveInt
    employee_registered: CPFMask
    created_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 27,
                "barcode": "123456789012",
                "name": "Example Product",
                "description": "Product description",
                "price": 10.5,
                "profit": 0.2,
                "stock": {
                    "quantity": 100,
                    "type": "grams"
                },
                "employee_registered": "123.456.789-09",
                "created_at": "2024-01-23T02:55:07.625430",
                "unit": 1
            }
        }
    