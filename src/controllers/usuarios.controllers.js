import { Usuario } from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
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
        suspendido: nuevoUsuario.suspendido,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Error al intentar crear un usuario.",
      });
    }
  };

  export const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        mensaje: "No se pudo encontrar la lista de usuarios",
      });
    }
  };
  
  export const obtenerUsuario = async (req, res) => {
    try {
      const usuarioBuscado = await Usuario.findById(req.params.id);
      res.status(200).json(usuarioBuscado);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        mensaje: "No se pudo encontrar el usuario",
      });
    }
  };

  export const borrarUsuario = async (req, res) => {
    try {
      const usuarioBuscado = await Usuario.findById(req.params.id);
      if (!usuarioBuscado) {
        return res.status(404).json({
          mensaje: "No se pudo eliminar el usuario, el id es incorrecto",
        });
      }
      await Usuario.findByIdAndDelete(req.params.id);
      res.status(200).json({ mensaje: "El usuario fue eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "ocurrio un error al intentar eliminar el usuario",
      });
    }
  };


  export const suspenderUsuario = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      usuario.suspendido = true;
      await usuario.save();
      res.status(200).json({ mensaje: 'Usuario suspendido correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al suspender usuario' });
    }
  };

  export const levantarSuspensionUsuario = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      usuario.suspendido = false;
      await usuario.save();
      res.status(200).json({ mensaje: 'Suspensión del usuario levantada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al levantar suspensión del usuario' });
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
        mensaje: "Inicio de sesión exitoso",
        email: usuarioBuscado.email,
        token: token,
        rol: usuarioBuscado.rol,
        suspendido: usuarioBuscado.suspendido
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Error al intentar loguear un usuario.",
      });
    }
  };