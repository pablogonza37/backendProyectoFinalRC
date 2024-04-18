import Venta from "../database/model/venta.js";

export const crearVenta = async (req, res) => {
    try {
      const nuevaVenta = new Venta(req.body);
      await nuevaVenta.save();
      res.status(201).json({
        mensaje: "La venta fue creada correctamente"
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear la venta"
      })
    }
  };

  export const listarVentas = async(req, res) => {
    try {
      const listaVentas = await Venta.find();
      res.status(200).json(listaVentas);   
    } catch (error) {
      console.log(error)
      res.status(404).json({mensaje: 'No se pudo encontrar la lista de ventas'})
    }
  };