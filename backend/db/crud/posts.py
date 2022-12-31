import datetime

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import PostModel
from ..schemas import PostCreationSchema


def create_post(request: PostCreationSchema, db: Session = Depends(get_db)):
    post = PostModel(
        caption=request.caption,
        image_url=request.image_url,
        image_url_type=request.image_url_type,
        pub_date=datetime.datetime.now(),
        owner_id=request.owner_id
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def list_of_posts(db: Session = Depends(get_db)):
    query = db.query(PostModel).all()
    return query
