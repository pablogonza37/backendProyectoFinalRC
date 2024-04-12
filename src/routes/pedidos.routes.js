import { Router } from "express";
import { crearPedido } from "../controllers/pedidos.controllers.js";


const router = Router();

router.route('/pedidos').post(crearPedido);
router.route('/pedidos/:id')

export default router;