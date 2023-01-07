import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from db.crud.comments import create_comment, list_of_comments
from db.database import get_db
from db.models import CommentModel, PostModel
from db.schemas import CommentCreationSchema, PostDisplaySchema, UserAuthSchema, PostCommentSchema
from utils.auth import get_current_user


router = APIRouter(
    tags=['posts']
)


@router.post('/posts/{post_id}/comments/', response_model=PostDisplaySchema)
def comment_create(
        post_id: int, request: CommentCreationSchema,
        db: Session = Depends(get_db),
        current_user: UserAuthSchema = Depends(get_current_user)):
    return create_comment(post_id, request, db, current_user)


@router.get('/posts/{post_id}/comments/', response_model=List[PostCommentSchema])
def comment_list(post_id: int, db: Session = Depends(get_db)):
    return list_of_comments(post_id, db)

