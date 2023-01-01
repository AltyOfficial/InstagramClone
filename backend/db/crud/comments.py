import datetime

from sqlalchemy.orm import Session

from ..models import CommentModel, PostModel
from ..schemas import CommentCreationSchema, UserAuthSchema


def create_comment(
        post_id: int, request: CommentCreationSchema,
        db: Session, current_user: UserAuthSchema):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    comment = CommentModel(
        text=request.text,
        pub_date=datetime.datetime.now(),
        author_id=current_user.id,
        post_id=post_id
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return post
