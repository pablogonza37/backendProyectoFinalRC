import { Router } from "express";
import { crearPedido, listarPedidos, obtenerPedido } from "../controllers/pedidos.controllers.js";


const router = Router();

router.route('/pedidos').post(crearPedido).get(listarPedidos);
router.route('/pedidos/:id').get(obtenerPedido);

export default router;