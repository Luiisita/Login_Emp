import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { pool } from "../config/db.js";


// ===============================
// CONFIGURAR TRANSPORT DE EMAIL
// ===============================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ===============================
// REGISTRO DE USUARIO
// ===============================
export const registerUsarios = async (req, res) => {
    const { Nombre, Email, Telefono, Contraseña, Rol, Estado } = req.body;

    try {
        const [exist] = await db.query(
            "SELECT * FROM Usuarios WHERE Email = ?",
            [Email]
        );

        if (exist.length > 0) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        // Generar código de verificación
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutos

        await db.query(
            `INSERT INTO Usuarios 
            (Nombre, Email, Telefono, Contraseña, Rol, Estado, verification_code, verification_expires_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [Nombre, Email, Telefono, hashedPassword, Rol, Estado, verificationCode, expiresAt]
        );

        // Enviar el email
        await transporter.sendMail({
            from: `"Emprendly ✔️" <${process.env.EMAIL_USER}>`,
            to: Email,
            subject: "Código de verificación",
            text: `Tu código de verificación es: ${verificationCode}`
        });

        res.json({ msg: "Usuario registrado. Código enviado al correo." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};



        // ===============================
        // VERIFICAR CÓDIGO
        // ===============================
        export const verifyEmailCode = async (req, res) => {
            const { Email, codigo } = req.body;

            try {
                const [user] = await db.query(
                    `SELECT * FROM Usuarios WHERE Email = ?`,
                    [Email]
                );

                if (user.length === 0) {
                    return res.status(404).json({ msg: "Usuario no encontrado" });
                }

                const u = user[0];

                if (u.verification_code !== codigo) {
                    return res.status(400).json({ msg: "Código incorrecto" });
                }

                if (new Date(u.verification_expires_at) < new Date()) {
                    return res.status(400).json({ msg: "El código expiró" });
                }

                await db.query(
                    `UPDATE Usuarios 
                    SET is_verified = 1, verification_code = NULL, verification_expires_at = NULL
                    WHERE Email = ?`,
                    [Email]
                );

                res.json({ msg: "Correo verificado correctamente" });

            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Error en el servidor" });
            }
        };

// ===============================
// LOGIN
// ===============================
export const loginUsarios = async (req, res) => {
    const { Email, Contraseña } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT * FROM Usuarios WHERE Email = ?",
            [Email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ msg: "Correo no registrado" });
        }

        const user = rows[0];

        if (user.is_verified === 0) {
            return res.status(400).json({ msg: "El correo no está verificado" });
        }

        const passMatch = await bcrypt.compare(Contraseña, user.Contraseña);

        if (!passMatch) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.Id_Usuarios, Email: user.Email, Rol: user.Rol },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            msg: "Login exitoso",
            token,
            usuario: {
                id: user.Id_Usuarios,
                Nombre: user.Nombre,
                Email: user.Email,
                rol: user.Rol
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};



// ===============================
// OBTENER TODOS LOS USUARIOS
// ===============================
export const getUsarios = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// ===============================
// OBTENER USUARIO POR ID
// ===============================
export const getUsariosByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            "SELECT * FROM Usuarios WHERE Id_Usuarios = ?",
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// ===============================
// AGREGAR USUARIO (ADMIN)
// ===============================
export const addUsarios = async (req, res) => {
    const { Nombre, Email, Telefono, Contraseña, Rol, Estado } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        await db.query(
            `INSERT INTO Usuarios (Nombre, Email, Telefono, Contraseña, Rol, Estado, is_verified)
             VALUES (?, ?, ?, ?, ?, ?, 1)`,
            [Nombre, Email, Telefono, hashedPassword, Rol, Estado]
        );

        res.json({ msg: "Usuario agregado correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// ===============================
// EDITAR USUARIO
// ===============================
export const editUsarios = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Telefono, Rol, Estado } = req.body;

    try {
        await db.query(
            `UPDATE Usuarios SET Nombre=?, Email=?, Telefono=?, Rol=?, Estado=?
             WHERE Id_Usuarios = ?`,
            [Nombre, Email, Telefono, Rol, Estado, id]
        );

        res.json({ msg: "Usuario actualizado" });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// ===============================
// ELIMINAR USUARIO
// ===============================
export const deleteUsarios = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            "DELETE FROM Usuarios WHERE Id_Usuarios = ?",
            [id]
        );

        res.json({ msg: "Usuario eliminado" });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
