from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from typing import Optional

from db.crud.users import get_user_by_username
from db.database import get_db


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login/')

# SECRET_KEY GENERATION COMMAND - openssl rand -hex 32
SECRET_KEY = '3a98daf12eaa2583371cd2f784af795552f5b2bd0ff9af8c8f6da8a31f35cb94'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('username')
        user = get_user_by_username(db=db, username=username)
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user
