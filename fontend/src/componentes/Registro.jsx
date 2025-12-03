import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registro.css";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    rol: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post("http://localhost:4000/api/Usuarios/register", {
      Nombre: form.nombre,
      Email: form.email,
      Telefono: null,               // porque tu formulario NO lo pide
       Contraseña: form.contraseña,
       Rol: form.rol,
       Estado: "Activo"              // si tu tabla lo requiere
});
      alert("✅ Usuario registrado con éxito");
      setForm({
        nombre: "",
        email: "",
        contraseña: "",
        rol: ""
      });
    } catch (error) {
      alert(error.response?.data?.message || "❌ Error al registrar usuario");
    }
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Menú Lateral */}
      <div 
        style={{
          position: 'fixed',
          left: menuOpen ? 0 : '-280px',
          top: 0,
          width: '250px',
          height: '100vh',
          background: 'linear-gradient(to bottom, #E5DED3, #CADBEC)',
          transition: 'left 0.3s ease',
          zIndex: 200,
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
          padding: '20px'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '15px',
          borderBottom: '2px solid #B6A999'
        }}>
          <span 
            style={{
              fontSize: '28px',
              cursor: 'pointer',
              color: '#B6A999',
              marginRight: '15px'
            }}
            onClick={toggleMenu}
          >
            ←
          </span>
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#B6A999'
          }}>Menú</span>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#F4E1B6',
            borderRadius: '5px',
            marginLeft: 'auto'
          }} />
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {['Usuarios', 'Inventario', 'Registro De Ventas', 'Reporte De Ventas', 
            'Registro De Gastos', 'Reporte De Gastos', 'Reporte De Ganancias', 'Ajustes'].map((item) => (
            <li key={item} style={{ marginBottom: '15px' }}>
              <a 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                style={{
                  textDecoration: 'none',
                  color: '#B6A999',
                  fontSize: '16px',
                  display: 'block',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#CADBEC';
                  e.target.style.color = '#000000';
                  e.target.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#B6A999';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <header className="barra-superior">
        <span 
          style={{
            fontSize: '30px',
            cursor: 'pointer',
            color: '#F5F6F7',
            padding: '5px 10px'
          }}
          onClick={toggleMenu}
        >
          ☰
        </span>
        <img src="/assets/Logo_Empren.png" alt="Logo" className="logo" />
      </header>

      <div className="container">
        <p className="p">Registro</p>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Usuario"
            required
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo"
            required
            autoComplete="off"
          />
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="contraseña"
              value={form.contraseña}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              autoComplete="new-password"
            />
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}
              onClick={togglePassword}
              style={{ cursor: "pointer" }}
            />
          </div>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
          <button type="submit" className="loginBtn">
            Registrarse
          </button>
        </form>
        <p className="registro">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </>
  );
}