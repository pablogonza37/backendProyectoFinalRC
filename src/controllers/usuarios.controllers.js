import { Usuario } from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
    try {
      const { email, password, rol } = req.body;
      const emailValidacion = await Usuario.findOne({ email });
      if (emailValidacion) {
        return res.status(400).json({
          mensaje: "Este correo ya se encuentra registrado.",
        });
      }
      const saltos = bcrypt.genSaltSync(10);
      const passEncriptada = bcrypt.hashSync(password, saltos);
      const nuevoUsuario = new Usuario(req.body);
      nuevoUsuario.password = passEncriptada;
      nuevoUsuario.save();
      const token = await generarJWT(nuevoUsuario._id, nuevoUsuario.email);
  
      res.status(201).json({
        mensaje: "Usuario creado correctamente.",
        email: nuevoUsuario.email,
        nombreUsuario: nuevoUsuario.nombreUsuario,
        rol: nuevoUsuario.rol,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Error al intentar crear un usuario.",
      });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const usuarioBuscado = await Usuario.findOne({ email });
      if (!usuarioBuscado) {
        return res.status(400).json({
          mensaje: "Correo o password incorrecto - correo",
        });
      }

      const passwordValido = bcrypt.compareSync(
        password,
        usuarioBuscado.password
      );
      if (!passwordValido) {
        return res.status(400).json({
          mensaje: "Correo o password incorrecto - password",
        });
      }
      const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);
      res.status(200).json({
        mensaje: "Los datos del usuario son correctos",
        email: email,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Error al intentar loguear un usuario.",
      });
    }
  };