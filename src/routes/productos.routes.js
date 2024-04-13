import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  borrarProducto,
  editarProducto,
} from "../controllers/productos.controllers.js";
import validacionesProducto from "../helpers/validacionProducto.js";
import validarJWT from "../helpers/verificarJWT.js";

const router = Router();

router.route("/productos").get(listarProductos).post([validarJWT,validacionesProducto], crearProducto);
router
  .route("/productos/:id")
  .get(obtenerProducto)
  .delete(validarJWT, borrarProducto)
  .put([validarJWT,validacionesProducto],editarProducto);

export default router;
