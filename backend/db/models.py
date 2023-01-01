from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)

    posts = relationship('PostModel', back_populates='owner')
    comments = relationship('CommentModel', back_populates='author')


class PostModel(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    caption = Column(String)
    image_url = Column(String)
    pub_date = Column(DateTime)
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship('UserModel', back_populates='posts')
    comments = relationship('CommentModel', back_populates='post')


class CommentModel(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    pub_date = Column(DateTime)
    author_id = Column(Integer, ForeignKey('users.id'))
    post_id = Column(Integer, ForeignKey('posts.id'))

    author = relationship('UserModel', back_populates='comments')
    post = relationship('PostModel', back_populates='comments')

