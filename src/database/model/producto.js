import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{
        type: String,
        required: true,
        unique: true,
        minLength:2,
        maxLength:50
    },
    precio:{
        type: Number,
        required:true,
        min:50,
        max:20000
    },
    imagen:{
        type:String,
        required:true,
        validate: {
            validator: function(value) {
                return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/.test(value);
            },
            message: props => `${props.value} no es una URL de imagen valida.`
        }
    },
    descripcionBreve: {
        type: String,
        required:true,
        minLength:5,
        maxLength:50
    },
    descripcionAmplia: {
        type: String,
        required:true,
        minLength:50,
        maxLength:500
    },
    categoria:{
        type:String,
        required: true,
        enum: ['Hamburguesas','Pastas', 'Postres', 'Carne asada', 'Milanesas']
    }
})

const Producto = mongoose.model('producto', productoSchema);

export default Producto;