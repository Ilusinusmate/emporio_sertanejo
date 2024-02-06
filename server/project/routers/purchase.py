from fastapi import APIRouter, Depends, Body, Query
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from project import schemas
from project.models import Product, Purchase, Session
from project.database import get_db
from project.oauth2 import get_current_user, is_authorized


router = APIRouter(
    prefix="/purchase",
    tags=["Purchase"]
)

@router.get("/consult", response_model=schemas.PurchaseConsult)
def consult_purchase(
    consult_id = Query(),
    current_session: Session = Depends(get_db)
) -> schemas.PurchaseConsult:
    
    try:
        
        purchase = current_session.query(Purchase).filter_by(id=consult_id).first()       

        return purchase
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)


@router.post("/", response_model=schemas.PurchaseUnitResponse, status_code=202)
def purchase_unit(
    data: schemas.PurchaseUnit = Body(),
    current_session: Session = Depends(get_db),
    current_user = Depends(get_current_user)
    
) -> schemas.PurchaseUnitResponse:
    
    try:  
        
        #   AUTHORIZATION      
        
        if not is_authorized("employee", current_user.role):
            raise HTTPException(detail="Not authorizated to realese this action", status_code=401)
        
        #   VALIDATIONS     
        
        product = current_session.query(Product).filter_by(barcode=data.barcode, unit=data.unit).first()   
        
        if product is None:
            raise HTTPException(detail="Barcode not registered in this unit", status_code=400)
        
        data.purchase = data.purchase.dict()
        
        if product.stock["type"] != data.purchase["type"]:
            raise HTTPException(
                detail="Informed types incorret. It must be 'grams' or 'units' and equal in purchase and stock",
                status_code=400
            )                          
            
        if product.stock["quantity"] <= data.purchase["quantity"]:
            raise HTTPException(
                detail="The purchase exceed the amount in stock",
                status_code=400
            )
            
        #   PREPARATION TO DATABASE CHANGES
            
        value = data.purchase["quantity"]
        total_price = value * product.price
            
        purchase = {data.barcode:data.purchase}
        del data.purchase
        del data.barcode 
        
        #   PAYMENT METHOD SEPARATION
        
        match(data.payment_method):
            case 0:
                validated=False
                
            case _: 
                validated=True
                product.stock = {
                    "quantity": product.stock["quantity"] - value,
                    "type": product.stock["type"]
                }
        
        #   DATABASE CAHNGES
        
        new_purchase = Purchase(
            **data.dict(),
            employee_registered=current_user.cpf,
            purchase=purchase,
            validated=validated,
            total_price=total_price
        )
        
        current_session.add(new_purchase)
        current_session.commit()
        current_session.refresh(new_purchase)
        
        return new_purchase
    
    except HTTPException as e:
        current_session.rollback()
        raise e
    
    except Exception as e:
        current_session.rollback()
        raise HTTPException(detail=str(e), status_code=500)
    
      