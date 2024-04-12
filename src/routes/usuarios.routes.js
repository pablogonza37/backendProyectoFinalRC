import {Router} from "express";
import { crearUsuario, login, listarUsuarios, obtenerUsuario } from "../controllers/usuarios.controllers.js";


const router = Router();

router.route("/usuarios").post(crearUsuario).get(listarUsuarios);
router
  .route("/usuarios/:id")
  .get(obtenerUsuario)
router.route("/").post(login)

export default router