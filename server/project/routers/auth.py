from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from datetime import datetime

from server.project import schemas
from server.project.models import User, Session
from server.project.database import get_db
from server.project.utils import verify
from server.project.oauth2 import create_jwt_token

router = APIRouter(
    tags=["Authentication"]
)


@router.post("/login", status_code=201, response_model=schemas.Token)
def login_user(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    current_session: Session = Depends(get_db)
):
    user = current_session.query(User).filter(
        User.email == user_credentials.username).first()
    
    if not user:
        raise HTTPException(
            status_code=403, detail=f"Invalid Credentials")

    if not verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=403, detail=f"Invalid Credentials")
    
    data={
        "user_id" : user.id
    }
    
    jwt_token = create_jwt_token(data=data)
    
    return {"jwt_token" : jwt_token, "created_at": datetime.utcnow()}