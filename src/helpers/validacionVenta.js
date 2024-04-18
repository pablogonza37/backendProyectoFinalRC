import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesVenta = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
  check("fecha")
    .notEmpty()
    .withMessage("La fecha es un dato obligatorio"),
  check("usuario")
    .notEmpty()
    .withMessage("El usuario es un dato obligatorio"),
    check("cantidad")
    .notEmpty()
    .withMessage("El usuario es un dato obligatorio"),
    check("precioTotal")
    .notEmpty()
    .withMessage("El precio toltal es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio total debe ser un número")
    .custom((value) => {
      if (value >= 50 && value <= 2000000) {
        return true;
      } else {
        throw new Error("El precio total debe estar entre $50 y $2000000");
      }
    }),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesVenta;
