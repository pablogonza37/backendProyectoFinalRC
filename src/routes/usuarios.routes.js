import { Router } from "express";
import {
  crearUsuario,
  login,
  listarUsuarios,
  obtenerUsuario,
  borrarUsuario,
  suspenderUsuario,
  levantarSuspensionUsuario
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/registrar").post(crearUsuario).get(listarUsuarios);
router.route("/administrar/:id").get(obtenerUsuario).delete(borrarUsuario);
router.route('/suspender/:id').put(suspenderUsuario);
router.route('/levantar-suspension/:id').put(levantarSuspensionUsuario);
router.route("/").post(login);

export default router;