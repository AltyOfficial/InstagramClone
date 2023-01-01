from fastapi import Depends, HTTPException, status
from pydantic import ValidationError
from sqlalchemy.orm.session import Session

from utils.hashing import Hash
from ..database import get_db
from ..models import UserModel
from ..schemas import UserCreationSchema


def create_user(request: UserCreationSchema, db: Session):
    if db.query(UserModel).filter(
            UserModel.username == request.username).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='this username already exists'
        )
    user = UserModel(
            username=request.username,
            email=request.email,
            first_name=request.first_name,
            last_name=request.last_name,
            password=Hash.hash_password(request.password)
        )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def list_of_users(db: Session):
    query = db.query(UserModel).all()
    return query


def get_user_by_username(username: str, db: Session):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='user not found'
        )
    return user
