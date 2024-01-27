from fastapi import APIRouter, Depends, Body, Query
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError
from typing import List

from project import schemas
from project.models import Product, Session
from project.database import get_db
from project.oauth2 import get_current_user

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.post("/", response_model=schemas.ProductResponse)
def register_product(
    data: schemas.ProductCreate = Body(),
    current_user = Depends(get_current_user),
    current_session: Session = Depends(get_db)
    
) -> schemas.ProductResponse:
    
    try:
        
        validation = current_session.query(Product).filter_by(barcode=data.barcode).first()
        if validation is not None and validation.unit == data.unit:
            raise HTTPException(detail="Barcode already registered in this unit", status_code=400)
        
        new_product = Product(**data.dict(), employee_registered=current_user.cpf)
        current_session.add(new_product)
        current_session.commit()
        current_session.refresh(new_product)
        
        return new_product
            
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)
    
@router.get("/all", response_model=List[schemas.ProductQuery])    
def query_all_products(
    unit: schemas.conint(ge=0, le=2) = Query(),
    current_session: Session = Depends(get_db)
) -> schemas.ProductQuery:

    try:
        
        products = current_session.query(Product).filter_by(unit=unit).all()
        
        products = [schemas.ProductQuery(**i.__dict__) for i in products ]
        
        
        return products
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)