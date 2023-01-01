from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from db import models, database
from routers import auth, posts, users


models.Base.metadata.create_all(database.engine)


app = FastAPI()


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)

app.mount('/media/', StaticFiles(directory='media/'), name='media')
