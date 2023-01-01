import datetime

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from utils.auth import get_current_user

from ..database import get_db
from ..models import PostModel
from ..schemas import PostCreationSchema, UserAuthSchema


def create_post(
        request: PostCreationSchema, db: Session,
        current_user: UserAuthSchema):
    post = PostModel(
        caption=request.caption,
        image_url=request.image_url,
        pub_date=datetime.datetime.now(),
        owner_id=current_user.id
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def list_of_posts(db: Session = Depends(get_db)):
    query = db.query(PostModel).all()
    return query


def delete_post(id: int, db: Session, current_user: UserAuthSchema):
    post = db.query(PostModel).filter(PostModel.id == id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='post not found'
        )

    if post.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='permission denied'
        )

    db.delete(post)
    db.commit()

    return 'ok'
    
    
