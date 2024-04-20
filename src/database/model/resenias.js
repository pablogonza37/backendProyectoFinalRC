import mongoose from "mongoose";

const reseniaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  resenia: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  valoracion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export const Resenia = mongoose.model("resenia", reseniaSchema);
