from fastapi import APIRouter, Depends, Body, Query, File, UploadFile, Form
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError
from typing import List, Annotated, Optional
import requests

from project import schemas, IMAGE_API_KEY, IMAGE_API_URl
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
        
        validation = current_session.query(Product).filter_by(barcode=data.barcode, unit=data.unit).first()
        if validation is not None:
            raise HTTPException(detail="Barcode already registered in this unit", status_code=400)
                
        new_product = Product(
            **data.dict(),
            employee_registered=current_user.cpf,
            )
        
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
    
    
@router.post("/image", status_code=200, response_model=schemas.ProductResponse)
def change_product_image(
    barcode: schemas.BARCODE = Query(),
    unit: schemas.UNIT = Query(), 
    current_user = Depends(get_current_user),
    current_session: Session = Depends(get_db),
    image: UploadFile = Optional[Annotated[bytes, File()]]
):
    try:
        product = current_session.query(Product).filter_by(barcode=barcode, unit=unit).first()
        if product is  None:
            raise HTTPException(detail="Barcode not registered in this unit", status_code=400)
        
        
        if image is not None:
            
            response = requests.post(
                url=f"{IMAGE_API_URl}?key={IMAGE_API_KEY}",
                files={"image":image.file}
            )
            response = response.json()
            status_code = response.get("status", 400)
            if status_code != 200:
                raise HTTPException(
                    status_code=status_code,
                    detail=response.get("error").get("message")
                )
            image_link:str = response.get("data").get("display_url")
            del status_code
            
            product.image_link = image_link
            current_session.commit()
            current_session.refresh(product)
            
            return product
            
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=500)