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
import validarJWT from "../helpers/verificarJWT.js";

const router = Router();

router.route("/usuarios").post([validacionesUsuario], crearUsuario).get(listarUsuarios);
router.route("/usuarios/:id").get(obtenerUsuario).delete(validarJWT, borrarUsuario);
router.route('/suspender/:id').put(suspenderUsuario);
router.route('/levantar-suspension/:id').put(levantarSuspensionUsuario);
router.route("/login").post(login);

export default router;