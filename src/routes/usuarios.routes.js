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
import validacionesUsuario from "../helpers/validacionUsuario.js";

const router = Router();

router.route("/usuarios").post([validacionesUsuario], crearUsuario).get(listarUsuarios);
router.route("/usuarios/:id").get(obtenerUsuario).delete(borrarUsuario);
router.route('/suspender/:id').put(suspenderUsuario);
router.route('/levantar-suspension/:id').put(levantarSuspensionUsuario);
router.route("/").post(login);

export default router;