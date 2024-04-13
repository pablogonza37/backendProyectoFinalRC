import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  borrarProducto,
  editarProducto,
} from "../controllers/productos.controllers.js";
import validacionesProducto from "../helpers/validacionProducto.js";

const router = Router();

router.route("/productos").get(listarProductos).post([validacionesProducto], crearProducto);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .delete(borrarProducto)
  .put(editarProducto);

export default router;
