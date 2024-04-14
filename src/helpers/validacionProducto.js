import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesProducto = [
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
      "La imagen debe tener un formato de URL valida y terminar en jpg|jpeg|gif|png"
    ),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(["Hamburguesas","Pastas", "Postres", "Carne asada", "Milanesas", "Pizzas", "Empanadas"])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: 'Hamburguesas','Pastas', 'Postres', 'Carne asada', 'Milanesas', 'Pizzas', 'Empanadas'"
    ),
    check("descripcionBreve")
    .notEmpty()
    .withMessage("La descripcion breve es un dato obligatorio")
    .isLength({ min: 5, max: 50 })
    .withMessage(
      "La descripcion debe tener entre 5 y 50 caracteres"
    ),
    check("descripcionAmplia")
    .notEmpty()
    .withMessage("La descripcion amplia es un dato obligatorio")
    .isLength({ min: 50, max: 500 })
    .withMessage(
      "La descripcion amplia debe tener entre 50 y 300 caracteres"
    ),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesProducto;