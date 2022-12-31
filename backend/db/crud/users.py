from fastapi import Depends, HTTPException, status
from pydantic import ValidationError
from sqlalchemy.orm.session import Session

from utils.hashing import Hash
from ..database import get_db
from ..models import UserModel
from ..schemas import UserCreationSchema


def create_user(request: UserCreationSchema, db: Session = Depends(get_db)):
    if db.query(UserModel).filter(
        UserModel.username==request.username).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='this username already exists'
        )
    user = UserModel(
            username=request.username,
            first_name=request.first_name,
            last_name=request.last_name,
            password=Hash.hash_password(request.password)
        )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def list_of_users(db: Session = Depends(get_db)):
    query = db.query(UserModel).all()
    return query
