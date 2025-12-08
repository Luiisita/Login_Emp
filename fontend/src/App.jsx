import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import Verify from "./componentes/Verify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/verify" element={<Verify />} /> 
      </Routes>
    </>
  );
}

export default App;
