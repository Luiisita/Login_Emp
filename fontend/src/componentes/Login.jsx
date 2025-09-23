import React, { useState } from "react";
import "./Login.css";
<img src="/assets/Logo_Empren.png" alt="Logo" className="logo" />


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Iniciando sesión...");
  };

  return (
    <>
      <header className="barra-superior">
        <img src="/assets/Logo_Empren.png" alt="Logo" className="logo" />
      </header>

      <div className="container">
        <p className="p">Inicia Sesión</p>
        <p className="inicio">
          ¿Es tu primera vez?{" "}
          <a href="http://127.0.0.1:5500/Index_2.html">Regístrate</a>
        </p>
        <img
          src="/assets/image_1.png"
          alt="tabla"
          height="200"
          width="200"
          id="tabla"
        />

        <form onSubmit={handleSubmit}>
          <input type="text" name="Nombre" required placeholder=" Usuario" />

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="Contraseña"
              required
              placeholder=" Contraseña"
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
