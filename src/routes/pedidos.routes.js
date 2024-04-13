import { Router } from "express";
import {
  borrarPedido,
  crearPedido,
  listarPedidos,
  obtenerPedido,
  cambiarEstadoPedido
} from "../controllers/pedidos.controllers.js";
import validacionesPedido from "../helpers/validacionPedido.js";

const router = Router();

router.route("/pedidos").post([validacionesPedido], crearPedido).get(listarPedidos);
router.route("/pedidos/:id").get(obtenerPedido).delete(borrarPedido).put(cambiarEstadoPedido);

export default router;
