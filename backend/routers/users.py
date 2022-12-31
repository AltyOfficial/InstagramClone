from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from db.crud.users import create_user, list_of_users
from db.schemas import (UserDisplaySchema, UserCreationSchema)


router = APIRouter(
    prefix='/users',
    tags=['users']
)


@router.post('/', response_model=UserDisplaySchema)
def user_create(request: UserCreationSchema, db: Session = Depends(get_db)):
    return create_user(request, db)


@router.get('/', response_model=List[UserDisplaySchema])
def user_list(db: Session = Depends(get_db)):
    return list_of_users(db)
