import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />
    </Routes>
  );
}

export default App;
