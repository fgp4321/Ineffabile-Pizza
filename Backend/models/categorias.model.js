const mongoose = require("mongoose")

const categoriasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    subcategoria: {
        type: String,
    },
})

const Categoria = mongoose.model("Categoria", categoriasSchema)


module.exports = Categoria