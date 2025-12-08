import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/Usuarios", userRoutes);

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("✅ Bienvenido a la API de Emprendly");
});

export default app;
