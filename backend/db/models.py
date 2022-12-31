from sqlalchemy import Column, Integer, String, ForeignKey
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


class PostModel(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, index=True)
    caption = Column(String)
    image_url = Column(String)
    pub_date = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship('UserModel', back_populates='posts')
