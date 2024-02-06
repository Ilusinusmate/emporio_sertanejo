from pydantic import BaseModel, constr, EmailStr, conint, PositiveInt, PositiveFloat, confloat
from pydantic_br import CPFMask
from datetime import datetime
from typing import Optional, List

BARCODE = constr(max_length=12, min_length=12)
UNIT = conint(ge=0, le=2)

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
        from_attributes = True
        json_schema_extra = {
            "example":{
                "id": 1,
                "username": "João Miguel",
                "email": "joaomiguel@gmail.com",
            }
        }
    
        

#   AUTH SCHEMAS

class Token(BaseModel):
    jwt_token: str
    created_at: datetime

class TokenData(BaseModel):
    id : Optional[CPFMask | int] = None
    
    
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
        from_attributes = True
        json_schema_extra = {
            "example":{
                "name": "João Miguel",
                "cpf": "123.456.789-09",
            }
        }


#   PRODUTCS SCHEMAS

class ProductQuery(BaseModel):
    name: str
    description: str
    price: PositiveFloat
    image_link: Optional[str]
    
    class Config:
        from_atributes = True


class Stock(BaseModel):
    quantity: PositiveInt
    type: constr(strict=True, pattern=r"^(grams|units)$")

    class Config:
        from_atributes = True
        json_schema_extra = {
            "example": {
                "quantity": 100,
                "type": "grams"
            }
        }
        
    

class ConsultProduct(BaseModel):
    barcode: constr(max_length=12, min_length=12) 
    unit: conint(ge=0, le=2)
    
    class Config:
        json_schema_extra = {
            "example" : {
                "barcode": "123456789123",
                "unit": "1"
            }
        }
        
class ConsultProductResponse(BaseModel):
    price: PositiveFloat
    profit: PositiveFloat
    name: str
    description: str
    stock: Stock
    class Config:
        from_attributes = True

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
    image_link: Optional[str]
    
    class Config:
        from_attributes = True
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
                "image_link": "https://your.image.com",
                "unit": 1
            }
        }

    

#   PURCHASE SCHEMAS


class PurchaseUnit(BaseModel):
    barcode: constr(min_length=12, max_length=12)
    purchase: Stock
    discount: confloat(ge=0, le=1)
    user_registered: Optional[CPFMask]
    unit: conint(ge=0, le=2)
    payment_method: conint(ge=0, le=2)
    class Config:
        from_attributes=True
        json_schema_extra = {
            "example": {
                "barcode": "123456789123",
                "purchase": {
                    "quantity": 10,
                    "type": "grams"
                },
                "discount": 0,
                "user_registered": "123.456.789-09",
                "unit": 1,
                "payment_method": 0
            }
        }

class PurchaseHelper(BaseModel):
    pass

class PurchaseLot(BaseModel):
    purchase: List[PurchaseHelper]
    
class PurchaseUnitResponse(BaseModel):
    id: int
    created_at: datetime
    employee_registered: CPFMask
    purchase: dict
    discount: confloat(ge=0, le=1)
    user_registered: Optional[CPFMask]
    unit: conint(ge=0, le=2)
    validated: bool
    payment_method: conint(ge=0, le=2)
    total_price: PositiveFloat
    
    class Config:
        from_attributes = True
    
    
class PurchaseLotResponse(PurchaseLot):
    id: int
    created_at: datetime
    employee_registered: CPFMask
    user_registered: CPFMask
    discount: confloat(ge=0, le=1)
    unit: conint(ge=0, le=2)
    
    class Config:
        from_attributes = True
        
class PurchaseConsult(BaseModel):
    id: int
    created_at: datetime
    employee_registered: CPFMask
    purchase: dict
    discount: confloat(ge=0, le=1)
    user_registered: Optional[CPFMask]
    unit: conint(ge=0, le=2)
    validated: bool
    payment_method: conint(ge=0, le=2)
    class Config:
        from_attributes = True

