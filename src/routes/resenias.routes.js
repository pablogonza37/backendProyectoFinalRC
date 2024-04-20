import { Router } from "express";
import {
  borrarResenia,
  crearResenia,
  listarResenias,
} from "../controllers/resenias.controllers.js";
import validacionesResenia from "../helpers/validacionResenia.js";

const router = Router();

router
  .route("/resenias")
  .get(listarResenias)
  .post([validacionesResenia], crearResenia);
router.route("/resenias/:id").delete(borrarResenia);
export default router;
