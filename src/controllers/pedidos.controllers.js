import Pedido from "../database/model/pedido.js";

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