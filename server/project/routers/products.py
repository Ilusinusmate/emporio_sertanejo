from fastapi import APIRouter, Depends, Body
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError

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