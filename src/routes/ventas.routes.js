import { Router } from "express";
import { crearVenta, listarVentas } from "../controllers/ventas.controllers.js";
import validacionesVenta from "../helpers/validacionVenta.js";

const router = Router();

router
  .route("/ventas")
  .post([validacionesVenta], crearVenta)
  .get(listarVentas);

export default router;