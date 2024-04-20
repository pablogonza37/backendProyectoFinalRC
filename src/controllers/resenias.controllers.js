import Resenia from "../database/model/resenia.js";

export const listarResenias = async(req, res) => {
    try {
      const listaResenia = await Resenia.find();
      res.status(200).json(listaResenia);   
    } catch (error) {
      console.log(error)
      res.status(404).json({mensaje: 'No se pudo encontrar la lista de reseñas'})
    }
  };

export const crearResenia = async (req, res) => {
    try {
      const nuevaResenia = new Resenia(req.body);
      await nuevaResenia.save();
      res.status(201).json({
        mensaje: "La reseña fue creada correctamente"
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear reseña"
      })
    }
  };

  export const borrarResenia = async (req, res) => {
    try {
      const reseniaBuscada = await Resenia.findById(req.params.id);
      if (!reseniaBuscada) {
        return res
          .status(404)
          .json({
            mensaje: "No se pudo eliminar la reseña, el id es incorrecto.",
          });
      }
      await Resenia.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ mensaje: "La reseña fue eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error al intentar borrar la reseña" });
    }
  };