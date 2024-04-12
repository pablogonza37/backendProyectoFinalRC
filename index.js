import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import "./src/database/database.js";
import productosRouter from "./src/routes/productos.routes.js";
import pedidosRouter from "./src/routes/pedidos.routes.js";
import usuarioRouter from './src/routes/usuarios.routes.js';

const app = express();
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", productosRouter);
app.use("/api", pedidosRouter);
app.use('/api/usuario', usuarioRouter)
