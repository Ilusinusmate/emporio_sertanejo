
from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError

from project import schemas
from project.models import User, Session
from project.database import get_db
from project.utils import hash


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register", response_model=schemas.UserResponse, status_code=201)
async def regist_user(
    data: schemas.UserCreate,
    current_session: Session = Depends(get_db)
    
) -> schemas.UserResponse:
    
    try:
        
        data.password = hash(data.password)
        
        new_user = User(**data.dict())
        current_session.add(new_user)
        current_session.commit()
        current_session.refresh(new_user)
        
        return new_user
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"Email {data.email} already resgistered. Error: {e}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{id}", response_model=schemas.UserResponse)
def get_user_by_id(
    id:int,
    current_session: Session = Depends(get_db)
    
) -> schemas.UserResponse:
    
    try:
        data = current_session.query(User).filter_by(id=id).first()
        
        if data is None:
            raise HTTPException(status_code=404, detail=f"User with id {id} does not exists.")
    
        return data
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))