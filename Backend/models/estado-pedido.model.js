const mongoose = require("mongoose")

const estadoPedidoSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ["Efectuado","Preparado","Listo","Entregado"]
    },
    payment: {
        type: String,
        required: true,
        enum: ["Efectivo","Credito","Debito","Transferencia"]
    },
})

const estadoPedido = mongoose.model("estadoPedido", estadoPedidoSchema)


module.exports = estadoPedido