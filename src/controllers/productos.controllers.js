import Producto from "../database/model/producto.js";

export const listarProductos = (req, res)=>{
    console.log('desde listar productos');
    res.send('enviar lista de productos...')
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