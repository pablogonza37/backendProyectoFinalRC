import mongoose, { Schema } from "mongoose";

const ventaSchema = new Schema({
    nombreProducto: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    fecha: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precioTotal:{
        type: Number,
        required: true,
        min: 50,
    },
    direccion: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 200
    }
});

const Venta = mongoose.model('venta', ventaSchema);

export default Venta;

