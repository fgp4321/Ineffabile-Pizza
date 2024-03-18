const mongoose = require("mongoose")

const pedidosSchema = new mongoose.Schema({
    usuario_nombre: {
        type: String,
        required: true,
    },
    producto_nombre: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    total: {
        type: String,
    },
    estadoPedido_status: {
        type: String,
    }
})

const Pedido = mongoose.model("Pedido", pedidosSchema)


module.exports = Pedido