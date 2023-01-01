from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from db.database import get_db
from db.models import UserModel
from utils.auth import create_access_token
from utils.hashing import Hash


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


@router.post('/login/')
def login(
        request: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(
        UserModel.username == request.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Invalid Credentials'
        )

    if not Hash.verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Incorrect password'
        )

    access_token = create_access_token(data={'username': user.username})

    return {
        'access_token': access_token,
        'token_type': 'Bearer',
        'user_id': user.id,
        'user_username': user.username
    }
