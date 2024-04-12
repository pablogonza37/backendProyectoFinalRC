import Pedido from "../database/model/pedido.js";

export const listarPedidos = async(req, res) => {
    try {
      const listaPedidos = await Pedido.find();
      res.status(200).json(listaPedidos);   
    } catch (error) {
      console.log(error)
      res.status(404).json({mensaje: 'No se pudo encontrar la lista de pedidos'})
    }
  };

  export const obtenerPedido = async (req, res)=>{
    try {
      const pedidoBuscado = await Pedido.findById(req.params.id);
      res.status(200).json(pedidoBuscado);
    } catch (error) {
      console.log(error)
      res.status(404).json({ mensaje: 'No se encontro el pedido solicitado'})
    }
  }

export const crearPedido = async (req, res) => {
    try {
      const nuevoPedido = new Pedido(req.body);
      await nuevoPedido.save();
      res.status(201).json({
        mensaje: "El pedido fue creado correctamente"
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear el pedido"
      })
    }
  };

  export const borrarPedido = async (req, res) => {
    try {
      const pedidoBuscado = await Pedido.findById(req.params.id);
      if (!pedidoBuscado) {
        return res
          .status(404)
          .json({
            mensaje: "No se pudo eliminar el pedido, el id es incorrecto.",
          });
      }
      await Pedido.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ mensaje: "El pedido fue eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar borrar el pedido" });
    }
  };