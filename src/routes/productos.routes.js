import { Router } from "express";
import { listarProductos } from "../controllers/productos.controllers.js";

const router = Router();

router.route('/productos').get(listarProductos);

export default router;