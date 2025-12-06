import express from "express";
import {
  registerUsarios,
  loginUsarios,
  verifyEmailCode,
  getUsarios,
  addUsarios,
  editUsarios,
  deleteUsarios,
  getUsariosByIdController,
} from "../controllers/user.controller.js";

import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🌟 AUTENTICACIÓN
router.post("/register", registerUsarios);     // Registrar usuario + enviar código
router.post("/verify", verifyEmailCode);       // Verificar código de email
router.post("/login", loginUsarios);           // Iniciar sesión



// 🌟 CRUD DE USUARIOS (protegido con token)
router.get("/", verificarToken, getUsarios);               // Obtener todos
router.get("/:id", verificarToken, getUsariosByIdController);  
router.post("/", verificarToken, addUsarios);  
router.put("/:id", verificarToken, editUsarios);
router.delete("/:id", verificarToken, deleteUsarios);

export default router;
