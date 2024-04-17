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

  export const cambiarEstadoPedido = async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.findByIdAndUpdate(
        req.params.id,
        { estado: "realizado" },
        { new: true }
      );
      if (!pedidoActualizado) {
        return res.status(404).json({
          mensaje: "No se encontró el pedido para actualizar su estado",
        });
      }
      res.status(200).json({
        mensaje: "El estado del pedido fue actualizado correctamente",
        pedido: pedidoActualizado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        mensaje: "Ocurrió un error al intentar actualizar el estado del pedido"
      });
    }
  };

  export const cambiarPedido = async (req, res) => {
    try {
      const buscarPedido = await Pedido.findById(req.params.id);
      if (!buscarPedido) {
        return res
          .status(404)
          .json({
            mensaje: "No se pudo editar el producto, el id es incorrecto.",
          });
      }
      await Pedido.findByIdAndUpdate(req.params.id, req.body);
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