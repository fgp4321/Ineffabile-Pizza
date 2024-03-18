const mongoose = require("mongoose")

const estadoPedidoSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
})

const estadoPedido = mongoose.model("estadoPedido", estadoPedidoSchema)


module.exports = estadoPedido