const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio_pvp: {
        type: String,
        required: true,
    },
    precio_oferta: {
        type: String,
    },
    categoria_nombre: {
        type: String,
    }
})

const Product = mongoose.model("Product", productsSchema)


module.exports = Product