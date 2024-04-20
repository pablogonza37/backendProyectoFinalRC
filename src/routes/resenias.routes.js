import { Router } from "express";
import { borrarResenia, crearResenia, listarResenias } from "../controllers/resenias.controllers";

const router = Router();

router.route("/resenias").get(listarResenias).post(crearResenia)
router.route("/resenias/:id").delete(borrarResenia)
export default router;