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

export const addUsariosBD = async ({ Nombre, Email  , Contraseña }) => {
  const [result] = await pool.query(
    "INSERT INTO Usuarios (Nombre, Email  , Contraseña) VALUES (?, ?, ?)",
    [Nombre, Email , Contraseña]
  );

  return { id: result.insertId, Nombre, Email  };
};


export const updateUsarios = async (id, { Nombre, Email  }) => {
  await pool.query(
    "UPDATE Usuarios SET Nombre = ?, Email  = ? WHERE Id_Usuarios = ?",
    [Nombre, Email , id]
  );
  return { id: Number(id), Nombre, Email  };
};

export const deleteUsarios = async (id) => {
  await pool.query("DELETE FROM Usuarios WHERE Id_Usuarios = ?", [id]);
  return true;
};

// // verificar codigo

export const verifyEmailCode = async (req, res) => {
  try {
    const { Email, codigo } = req.body;

    const [rows] = await pool.query(
      `SELECT codigo_verificacion FROM Usuarios WHERE Email = ?`,
      [Email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ msg: "Correo no existe" });
    }

    if (rows[0].codigo_verificacion !== codigo) {
      return res.status(400).json({ msg: "Código incorrecto" });
    }

    // Actualizar usuario a verificado
    await pool.query(
      `UPDATE Usuarios SET verificado = 1 WHERE Email = ?`,
      [Email]
    );

    res.json({ msg: "Correo verificado correctamente 🎉" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al verificar código" });
  }
};
