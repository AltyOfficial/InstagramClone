from datetime import datetime
from pydantic import BaseModel, Field, validator
from typing import List


# Schema for creation a user
class UserCreationSchema(BaseModel):
    username: str = Field(...)
    email: str = Field(...)
    first_name: str = Field(...)
    last_name: str = Field(...)
    password: str = Field(...)

    @validator('username')
    def non_empty_username(cls, value):
        if value == '':
            raise ValueError('username field cannot be empty')
        return value
    
    @validator('email')
    def custom_email_validation(cls, value):
        if value == '':
            raise ValueError('email field cannot be empty')
        if '@' not in value or '.' not in value:
            raise ValueError('enter valid email')
        return value

    @validator('first_name')
    def non_empty_first_name(cls, value):
        if value == '':
            raise ValueError('first_name field cannot be empty')
        return value.title()

    @validator('last_name')
    def non_empty_last_name(cls, value):
        if value == '':
            raise ValueError('last_name field cannot be empty')
        return value.title()

    @validator('password')
    def password_validation(cls, value):
        if len(value) < 6:
            raise ValueError('password is too short')
        return value


# Schema for authentication a user
class UserAuthSchema(BaseModel):
    id: int
    username: str
    email: str


# Schema for user display
class UserDisplaySchema(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


# Schema for displaying a user in a post detail
class PostOwnerSchema(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


# Schema for displaying a user in a comment detail
class CommentAuthorSchema(BaseModel):
    username: str

    class Config:
        orm_mode = True


# Schema for creation a post
class PostCreationSchema(BaseModel):
    caption: str
    image_url: str


# Schema for creation a comment
class CommentCreationSchema(BaseModel):
    text: str


# Schema for displaying a comment in a post detail
class PostCommentSchema(BaseModel):
    text: str
    pub_date: datetime
    author: CommentAuthorSchema

    class Config:
        orm_mode = True


# Schema for post display
class PostDisplaySchema(BaseModel):
    id: int
    caption: str
    image_url: str
    pub_date: datetime
    owner: PostOwnerSchema
    comments: List[PostCommentSchema]

    class Config:
        orm_mode = True
