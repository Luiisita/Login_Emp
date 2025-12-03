import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "No se envió el token" });
    }

    const token = authHeader.split(" ")[1]; // Formato: "Bearer token"

    if (!token) {
      return res.status(401).json({ message: "Token requerido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido o expirado" });
      }

      req.user = data; // datos del usuario dentro del token
      next();
    });
  } catch (error) {
    console.error("Error en verificarToken:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
