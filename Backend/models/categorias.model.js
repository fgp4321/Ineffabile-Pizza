const mongoose = require("mongoose")

const categoriasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    subcategoria: {
        type: String,
        required: true,
    },
})

const Categoria = mongoose.model("Categoria", categoriasSchema)


module.exports = Categoria