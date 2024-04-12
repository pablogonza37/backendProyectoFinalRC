import Producto from "../database/model/producto.js";

export const listarProductos = async(req, res) => {
    try {
      const productos = await Producto.find();
      res.status(200).json(productos);   
    } catch (error) {
      console.log(error)
      res.status(404).json({mensaje: 'No se pudo encontrar la lista de productos'})
    }
  };

  export const obtenerProducto = async (req, res)=>{
    try {
      const productoBuscado = await Producto.findById(req.params.id);
      res.status(200).json(productoBuscado);
    } catch (error) {
      console.log(error)
      res.status(404).json({ mensaje: 'No se encontro el producto solicitado'})
    }
  }

export const crearProducto = async (req, res) => {
    try {
      const productoNuevo = new Producto(req.body);
      await productoNuevo.save();
      res.status(201).json({
        mensaje: "El producto fue creado correctamente"
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear producto"
      })
    }
  };

  export const borrarProducto = async (req, res) => {
    try {
      const buscarProducto = await Producto.findById(req.params.id);
      if (!buscarProducto) {
        return res
          .status(404)
          .json({
            mensaje: "No se pudo eliminar el producto, el id es incorrecto.",
          });
      }
      await Producto.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ mensaje: "El producto fue eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar borrar el producto" });
    }
  };

  export const editarProducto = async (req, res) => {
    try {
      const buscarProducto = await Producto.findById(req.params.id);
      if (!buscarProducto) {
        return res
          .status(404)
          .json({
            mensaje: "No se pudo editar el producto, el id es incorrecto.",
          });
      }
      await Producto.findByIdAndUpdate(req.params.id, req.body);
      res
        .status(200)
        .json({ mensaje: "El producto fue modificado exitosamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar editar el producto" });
    }
  };