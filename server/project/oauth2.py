from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.exceptions import HTTPException
from jose import JWTError, jwt
from datetime import datetime

from project import schemas
from project.models import Session, User, Employee
from project.database import get_db
from project import SECRET_JWT_KEY, ALGORITHM, EXPIRATION_TIME


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


def create_jwt_token(data:dict) -> dict:
    to_encode = data.copy()
    expire = datetime.utcnow() + EXPIRATION_TIME
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_JWT_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    print(token)
    try:

        payload = jwt.decode(token, SECRET_JWT_KEY, algorithms=[ALGORITHM])
        print(f"decoded playload: {payload}")
        id: str = payload.get("user_id", None)
        if id is None:
            id: str = payload.get("cpf", None)
        if id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
    except JWTError as e:
        print("JWTError:", e)
        raise credentials_exception

    return token_data


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401,
                                          detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    token = verify_access_token(token, credentials_exception)

    user = db.query(User).filter(User.id == token.id).first()
    if user is None:
        user = db.query(Employee).filter(Employee.cpf == token.id).first()
    if user is None:
        raise HTTPException("Credentials does not match database", "400")
    
    
    return user