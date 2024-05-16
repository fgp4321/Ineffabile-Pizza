const mongoose = require("mongoose")

const pedidosSchema = new mongoose.Schema({
    usuario_nombre: {
        type: String,
        required: true,
    },
    productos: [{
        nombre: {
            type: String,
            required: true,
        },
        cantidad: {
            type: Number,
            required: true,
        }
    }],
    fecha: {
        type: Date,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    estadoPedido_status: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Pedido = mongoose.model("Pedido", pedidosSchema)

Pedido.findPedidos = async function(){
    try {
        const pedidos = await Pedido.find({ isActive: true });
        return pedidos;
    } catch (error) {
        throw error;
    }
}

Pedido.buscarPorId = async function (pedidoId) {
    try {
        const pedido = await Pedido.findById(pedidoId)
        if (pedido) {
            return pedido
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

Pedido.crearPedido = async (nuevoPedido) => {
    try {
        const pedidoCreado = await Pedido.create(nuevoPedido)
        return nuevoPedido;
    } catch (error) {
        throw error
    }
};

Pedido.actualizarPedido = async function (pedidoId, datosActualizados) {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, datosActualizados, { new: true })
        if (pedidoActualizado) {
            return pedidoActualizado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

Pedido.eliminarPedido = async function (pedidoId) {
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(pedidoId)
        if (pedidoEliminado) {
            return pedidoEliminado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

Pedido.desactivarPedido = async function(pedidoId) {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, { isActive: false }, { new: true });
        return pedidoActualizado;
    } catch (error) {
        throw error;
    }
}

module.exports = Pedido