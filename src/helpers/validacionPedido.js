import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesPedido = [
  check("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom((value) => {
      if (value >= 50 && value <= 20000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre $50 y $20000");
      }
    }),
  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/)
    .withMessage(
      "La imagen debe tener un formato de URL válida y terminar en jpg|jpeg|gif|png"
    ),
  check("estado")
    .notEmpty()
    .withMessage("El estado es un dato obligatorio")
    .isIn(["pendiente", "realizado"])
    .withMessage("El estado debe ser 'pendiente', 'en proceso' o 'enviado'"),
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
    check("direccion")
    .notEmpty()
    .withMessage("La direccion es un dato obligatorio")
    .isLength({ min: 2, max: 200 })
    .withMessage("La direccion debe tener entre 2 y 200 caracteres"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesPedido;
