import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesResenia = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
  check("resenia")
    .notEmpty()
    .withMessage("La reseña es un dato obligatorio"),
    check("valoracion")
    .notEmpty()
    .withMessage("La valoracion es un dato obligatorio")
    .isNumeric()
    .withMessage("La valoracion debe ser un número")
    .custom((value) => {
      if (value >= 1 && value <= 5) {
        return true;
      } else {
        throw new Error("La valoracion debe estar entre 1 y 5");
      }
    }),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesResenia;
