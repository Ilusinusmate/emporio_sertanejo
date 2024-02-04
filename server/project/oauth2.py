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

    if isinstance(token.id, str):
        user = db.query(Employee).filter_by(cpf=token.id).first()
    else:
        user = db.query(User).filter_by(id=token.id).first()
        
    if user is None:
        raise HTTPException(detail="Credentials does not match database", status_code=400)
           
    return user


def is_authorized(auth_level:set or str, user_role):
    
    authorization_groups = {
        "admin" : {0},
        "employee" : {0, 1},
        "user" : {0, 1, 2}
    }
    
    if isinstance(auth_level, str):
        query = authorization_groups.get(auth_level, None)
        
        if query is None:
            raise HTTPException(detail=f"auth_level: {auth_level} does not match any role.", status_code=500)
        
        if user_role in query:
            return True
        
        return False
    
    return user_role in auth_level