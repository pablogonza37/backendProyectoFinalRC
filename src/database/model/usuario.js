import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    validate: {
      validator: (value) => {
        const pattern =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return pattern.test(value);
      },
    },
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  rol: {
    type: String,
    trim: true,
    require: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  suspendido: {
    type: Boolean,
    default: false
  }
});

export const Usuario = mongoose.model("usuario", usuarioSchema);