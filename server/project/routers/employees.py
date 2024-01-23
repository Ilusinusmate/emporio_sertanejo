from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from project import schemas
from project.models import Employee, Session
from project.database import get_db
from project.utils import verify, hash
from project.oauth2 import create_jwt_token

router = APIRouter(
    prefix="/employee",
    tags=["Authentication"]
)


@router.post("/login", status_code=201, response_model=schemas.Token)
def login_employee(
    employee_credentials: OAuth2PasswordRequestForm = Depends(),
    current_session: Session = Depends(get_db)
):
    employee = current_session.query(Employee).filter(
        Employee.cpf == employee_credentials.username).first()
    
    if not employee:
        raise HTTPException(
            status_code=403, detail=f"Invalid Credentials")

    if not verify(employee_credentials.password, employee.password):
        raise HTTPException(
            status_code=403, detail=f"Invalid Credentials")
    
    data={
        "cpf" : employee.cpf,
        "role" : employee.role
    }
    
    jwt_token = create_jwt_token(data=data)
    
    return {"jwt_token" : jwt_token, "created_at": datetime.utcnow()}


@router.post("/register", response_model=schemas.EmployeeResponse, status_code=201)
async def regist_employee(
    data: schemas.EmployeRegister,
    current_session: Session = Depends(get_db)
    
) -> schemas.EmployeeResponse:
    
    try:
        
        data.password = hash(data.password)
        
        new_user = Employee(**data.dict())
        current_session.add(new_user)
        current_session.commit()
        current_session.refresh(new_user)
        
        return new_user
    
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail=f"Email {data.cpf} already resgistered. Error: {e}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))