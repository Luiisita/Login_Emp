# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine
from auth import router as auth_router

app = FastAPI(title="Auth mínimo Emprenddly")

# Crea tablas
Base.metadata.create_all(bind=engine)

# CORS (ajusta origins a tu frontend)
origins = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5500",  # Live Server
    "http://localhost:5500",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"status": "ok"}

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Modelo para recibir datos del login
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(request: LoginRequest):
    # 👇 Aquí pondrás tu validación contra base de datos
    if request.username == "admin" and request.password == "1234":
        return {"message": "Login exitoso", "role": "admin"}
    elif request.username == "user" and request.password == "1234":
        return {"message": "Login exitoso", "role": "user"}
    else:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 puedes restringirlo a ["http://127.0.0.1:5500"] si usas Live Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db import SessionLocal
from models import User

app = FastAPI()

# Dependencia de sesión DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Modelo de request
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username, User.password == request.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    return {"message": "Login exitoso", "role": user.role}
