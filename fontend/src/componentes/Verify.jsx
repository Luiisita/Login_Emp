
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Verify.css";


export default function VerificarCodigo() {
  const [Email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/Usuarios/verificar", {
        Email: Email,
        Codigo: codigo
      });

      alert("Correo verificado correctamente 🎉");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verificar Código</h2>

      <input 
        type="email"
        placeholder="Correo"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input 
        type="text"
        placeholder="Código de verificación"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        maxLength="6"
        pattern="[0-9]*"
        required
      />

      <button type="submit">Verificar</button>
    </form>
  );
}
