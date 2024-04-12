import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  borrarProducto,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route("/productos").get(listarProductos).post(crearProducto);
router.route("/productos/:id").get(obtenerProducto).delete(borrarProducto);

export default router;
