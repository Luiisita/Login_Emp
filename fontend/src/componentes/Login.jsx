import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [Email, setEmail] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/Usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           Email: Email,
            Contraseña: Contraseña
        }),
      });
      const text = await response.text();
      console.log("RESPUESTA DEL SERVIDOR ----->", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("❌ No es JSON válido");
        return alert("El servidor no está enviando JSON");
      }
      if (!response.ok) {
        alert("❌ " + data.message);
        return;
      }
      alert("✅ Sesión iniciada correctamente");
      console.log(data);
      // Ejemplo para guardar token
      // localStorage.setItem("token", data.token);
      //
    } catch (error) {
      console.error(error);
      alert(" Error conectando con el servidor");
    }
  };

  return (
    <>
      

      {/* Menú Lateral */}
      <div className={`menu-lateral ${menuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <span className="menu-close" onClick={toggleMenu}>←</span>
          <span className="menu-title">Menú</span>
          <div className="menu-logo-small"></div>
        </div>
        <ul>
          <li><a href="#usuarios">Usuarios</a></li>
          <li><a href="#inventario">Inventario</a></li>
          <li><a href="#registro-ventas">Registro De Ventas</a></li>
          <li><a href="#reporte-ventas">Reporte De Ventas</a></li>
          <li><a href="#registro-gastos">Registro De Gastos</a></li>
          <li><a href="#reporte-gastos">Reporte De Gastos</a></li>
          <li><a href="#reporte-ganancias">Reporte De Ganancias</a></li>
          <li><a href="#ajustes">Ajustes</a></li>
        </ul>
      </div>

      {/* Barra Superior */}
      <header className="barra-superior">
        <span className="menu-icon" onClick={toggleMenu}>☰</span>
        <img src="/assets/Logo_Empren.png" alt="Logo" className="logo" />
      </header>

      <div className="container">
        <p className="p">Inicia Sesión</p>
        <p className="inicio">
          ¿Es tu primera vez?{" "}
          <a href="http://localhost:5173/register">Regístrate</a>
        </p>
        
        <form onSubmit={handleSubmit} autoComplete="off">
          
          {/* CAMPO Email */}
          <input
            type="Email"
            name="Email"
            required
            placeholder="Correo electrónico"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {/* CAMPO CONTRASEÑA */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="Contraseña"
              required
              placeholder="Contraseña"
              value={Contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              autoComplete="new-password"
            />
            <i
              className={`bx ${showPassword ? "bx-hide" : "bx-show"}`}
              onClick={togglePassword}
            ></i>
          </div>
          <p className="recuperar">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </p>
          <button type="submit" id="loginBtn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;