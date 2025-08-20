from db import SessionLocal
from models import User

# Abrir sesión
db = SessionLocal()

# Leer todos los usuarios
users = db.query(User).all()

# Imprimir usuarios en consola
for u in users:
    print(u.id, u.email, u.is_active)

db.close()