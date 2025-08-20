# models.py
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class User(Base):
    __tablename__ = "users"

    Id_Usuarios = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String, unique=True, index=True, nullable=False)
    Email = Column(String(100), unique=True, index=True, nullable=False)
    Telefono = Column(String(20))
    Contraseña = Column(String, nullable=False)
    Rol = Column(String, nullable=False)  # admin, user, etc.
    Estado = Column (String(20), default="activo")


class Metodo_Pago(Base):
    __tablename__= "metodo_pago"

    Id_Metodo = Column (Integer, primary_key=True, index=True)
    Nombre = Column(String(50), nullable=False)
    Descripcion = Column(Text)


class Producto(Base):
    __tablename__= "producto"

    Id_Productos = Column (Integer, primary_key=True, index=True)
    Nombre = Column (String(100), nullable=False)
    Precio = Column ()
    
    ventas = relationship("RegistroVenta", back_populates="producto")


class Registro_Ventas(Base):
    __tablename__ = "registo_ventas"

    Id_Venta = Column (Integer, primary_key=True, index=True)
    Id_Productos = Column (Integer, ForeignKey("Productos.Id_Productos"), nullable=False)
    Cantidad = Column (Integer, nullable=False )
    Id_Metodo = Column (Integer, ForeignKey("Metodo_Pago.Id_Metodo"), nullable=False)
    Id_Usuarios = Column (Integer, ForeignKey("Usuarios.Id_Usuarios"), nullable=False)
    Fecha = Column (Date, nullable=False)

    producto = relationship("Producto", back_populates="ventas")
    metodo_pago = relationship("MetodoPago")
    usuario = relationship("Usuario")


class Reporte_Ventas (Base):
    __tablename__ = "reporte_ventas"

    Id_Reporte = Column (Integer, primary_key=True, index=True)
    Id_Usuarios = Column (Integer, ForeignKey("Usuarios.Id_Usuarios"), nullable=False)
    Id_Productos = Column (Integer, ForeignKey("Productos.Id_Productos"), nullable=False)
    Id_Venta = Column (Integer, ForeignKey("Registro_Ventas.Id_Venta"), nullable=False)
    Fecha = Column (Date, nullable=False)

    usuario = relationship("Usuario")
    producto = relationship("Producto")
    venta = relationship("RegistroVenta")


class Reporte_Ganancias (Base):
    __tablename__ = "reporte_ventas"

    Id_Reporte = Column (Integer, primary_key=True, index=True)
    Fecha = Column (Date, nullable=False)
    Id_Venta = Column (Integer,ForeignKey("Registro_Venta.Id_Venta"), nullable=False )
    Monto = Column (DECIMAL (10, 2), nullable=False)
    Id_Metodo = Column (Integer, ForeignKey("Usuarios.Id_Usuarios"), nullable=False)
    Id_Productos = Column (Integer, ForeignKey("Usuarios.Id_Usuarios"), nullable=False)

    venta = relationship("RegistroVenta")
    metodo_pago = relationship("MetodoPago")
    producto = relationship("Producto")



class ReporteDePedido(Base):
    __tablename__ = "ReporteDePedidos"

    id_REP = Column(Integer, primary_key=True, index=True)
    Fecha_Generacion = Column(Date, nullable=False)
    Estado = Column(String(50), nullable=False)
    Formato = Column(String(50), nullable=False)
    Id_Usuarios = Column(Integer, ForeignKey("Usuarios.Id_Usuarios"), nullable=False)
    Id_Venta = Column(Integer, ForeignKey("Registro_Ventas.Id_Venta"), nullable=False)

    usuario = relationship("Usuario")
    venta = relationship("RegistroVenta")



class RegistroGasto(Base):
    __tablename__ = "Registro_Gastos"

    Id_Gasto = Column(Integer, primary_key=True, index=True)
    Categoria = Column(String(50), nullable=False)
    Fecha = Column(Date, nullable=False)
    Monto = Column(DECIMAL(10, 2), nullable=False)
    Id_Venta = Column(Integer, ForeignKey("Registro_Ventas.Id_Venta"), nullable=False)

    # Relación con ventas
    venta = relationship("RegistroVenta")



class ReporteGasto(Base):
    __tablename__ = "Reporte_Gastos"

    id_Repor_Gastos = Column(Integer, primary_key=True, index=True)
    Id_Gasto = Column(Integer, ForeignKey("Registro_Gastos.Id_Gasto"), nullable=False)
    Dia = Column(Date, nullable=False)
    Id_Metodo = Column(Integer, ForeignKey("Metodo_Pago.Id_Metodo"), nullable=False)

    # Relaciones
    gasto = relationship("RegistroGasto")
    metodo_pago = relationship("MetodoPago")




class RegistroInventario(Base):
    __tablename__ = "Registro_Inventario"

    ID_INVENTARIO = Column(Integer, primary_key=True, index=True)
    NOMBRE = Column(String(100), nullable=False)
    CANTIDAD = Column(Integer, nullable=False)
    VALOR_UNITARIO = Column(Integer, nullable=False)
    Id_Productos = Column(Integer, ForeignKey("Productos.Id_Productos"), nullable=False)

    # Relación con productos
    producto = relationship("Producto")



class ReporteInventario(Base):
    __tablename__ = "Reporte_Inventario"

    Id_ReportInventario = Column(Integer, primary_key=True, index=True)
    Id_Productos = Column(Integer, ForeignKey("Productos.Id_Productos"), nullable=False)
    Fecha_Reporte = Column(Date, nullable=False)
    Cantidad_Producto = Column(Integer, nullable=False)
    Observaciones = Column(Text)

    # Relación con productos
    producto = relationship("Producto")


