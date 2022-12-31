import random
import shutil
import string

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from db.crud.posts import create_post, list_of_posts
from db.schemas import PostCreationSchema, PostDisplaySchema


router = APIRouter(
    prefix='/posts',
    tags=['posts']
)


@router.post('/', response_model=PostDisplaySchema)
def post_create(request: PostCreationSchema, db: Session = Depends(get_db)):
    return create_post(request, db)


@router.post('/upload_image/')
def upload_image(image: UploadFile = File(...)):
    letters = string.ascii_letters
    rand_str = ''.join(random.choice(letters) for i in range(10))
    filename = image.filename.rsplit('.', 1)
    path = f'media/images/{filename[0]}_{rand_str}.{filename[1]}'

    with open(path, "w+b") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {'filename': path}


@router.get('/', response_model=List[PostDisplaySchema])
def post_list(db: Session = Depends(get_db)):
    return list_of_posts(db) 
