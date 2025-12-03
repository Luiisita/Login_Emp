import pool from "../config/db.js"; //  conexión a MySQL

// Obtener todos los usuarios
export const getAllUsarios = async () => {
  const [rows] = await pool.query("SELECT * FROM Usuarios");
  return rows;
};

export const getUsariosById = async (id) => {
  const [rows] = await pool.query(
    "SELECT Id_Usuarios, Nombre, Email   FROM Usuarios WHERE Id_Usuarios = ?",
    [id]
  );
  return rows[0];
};

export const addUsariosBD = async ({ nombre, Email  , Contraseña }) => {
  const [result] = await pool.query(
    "INSERT INTO Usuarios (Nombre, Email  , Contraseña) VALUES (?, ?, ?)",
    [nombre, Email , Contraseña]
  );

  return { id: result.insertId, nombre, Email  };
};


export const updateUsarios = async (id, { nombre, Email  }) => {
  await pool.query(
    "UPDATE Usuarios SET Nombre = ?, Email  = ? WHERE Id_Usuarios = ?",
    [nombre, Email , id]
  );
  return { id: Number(id), nombre, Email  };
};

export const deleteUsarios = async (id) => {
  await pool.query("DELETE FROM Usuarios WHERE Id_Usuarios = ?", [id]);
  return true;
};

