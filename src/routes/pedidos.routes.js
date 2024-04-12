import { Router } from "express";
import {
  borrarPedido,
  crearPedido,
  listarPedidos,
  obtenerPedido,
  cambiarEstadoPedido
} from "../controllers/pedidos.controllers.js";

const router = Router();

router.route("/pedidos").post(crearPedido).get(listarPedidos);
router.route("/pedidos/:id").get(obtenerPedido).delete(borrarPedido).put(cambiarEstadoPedido);

export default router;
