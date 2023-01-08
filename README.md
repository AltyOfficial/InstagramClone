# API и React клиент для проекта InstagramClone с использованием FastAPI

Проект является клоном Instagram. В проекте доступно обращение к API, так же подключена frontend часть с использование create-react-app. В проекте доступна аутентификация и авторизация по Bearer токену, пользователи могут создавать посты, просматривать список других постов, удалять свои посты и оставлять комментарии.

## Интсрументы и технологии
![](https://img.shields.io/badge/python-3.11-blue)
![](https://img.shields.io/badge/FastAPI-0.88-green)
![](https://img.shields.io/badge/uvicorn-0.20-yellow)
![](https://img.shields.io/badge/SQLAlchemy-1.4-orange)
![](https://img.shields.io/badge/npm-7.21.0-blueviolet)
![](https://img.shields.io/badge/create--react--app-5.0.1-critical)



#### Документация к API находится после локального запуска проекта по адресу http://127.0.0.1:8000/docs#/ и http://127.0.0.1:8000/redoc


## Установка проекта локально
#### Клонировать проект 
```sh
https://github.com/AltyOfficial/InstagramClone.git
```
#### Перейти в директорию с проектом. Создать и установить виртуальное окружение, установить зависимости
```sh
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
```
#### Для запуска backend части - перейти в директорию backend и запустить сервер
```sh
cd backend/
uvicorn main:app --reload
```

#### Для запуска frontend части - перейти в директорию frontend и запустить react клиент
```sh
cd frontend/
npm start
```

##### После подключения backend и frontend части, клиент расположен по адресу http://localhost:3000/
