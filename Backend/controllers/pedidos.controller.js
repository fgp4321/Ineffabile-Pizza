const Pedido = require("../models/pedidos.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")

exports.obtenerPedidosPorUsuario = wrapAsync(async (req, res) => {
    try {
        const pedidos = await Pedido.find({ usuario_nombre: req.session.userLogued.username }).sort({ fecha: -1 });
        res.render('mis-pedidos.ejs', { pedidos });
    } catch (error) {
        console.error("Error al obtener pedidos por usuario:", error);
        res.status(500).json({ error: "Error interno al obtener pedidos" });
    }
});


exports.obtenerTodosPedidos = wrapAsync(async (req, res) => {
    const sortOrder = req.query.sort || 'desc'; // Recibe el parámetro de ordenamiento, por defecto 'desc'
    try {
        const pedidos = await Pedido.find({ isActive: true }).sort({ fecha: sortOrder === 'desc' ? -1 : 1 });
        res.render('pedidos.ejs', { pedidos: pedidos, currentSort: sortOrder });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }
});

exports.buscarPorId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.buscarPorId(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        res.status(500).json({ error: "Error interno al obtener el pedido por ID" });
    }
});

exports.crearPedido = wrapAsync(async (req, res) => {
    const nuevoPedido = req.body;

    try {
        const pedidoCreado = await Pedido.crearPedido(nuevoPedido);
        res.status(200).json(pedidoCreado);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el pedido" });
    }
});

exports.actualizarPedido = wrapAsync(async (req, res) => {
    const { id } = req.params
    const datosActualizados = req.body
    try {
        const pedidoActualizado = await Pedido.actualizarPedido(id, datosActualizados)
        if (pedidoActualizado) {
            res.status(200).json(pedidoActualizado)
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" })
    }
})

exports.eliminarPedido = wrapAsync(async (req, res) => {
    const { id } = req.params
    try {
        const pedidoEliminado = await Pedido.eliminarPedido(id)
        if (pedidoEliminado) {
            res.status(200).json(pedidoEliminado)
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" })
    }
})

exports.desactivarPedido = wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const pedidoDesactivado = await Pedido.desactivarPedido(id);
        if (pedidoDesactivado) {
            res.redirect("/pedidos")
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" });
        }
    } catch (error) {
        console.error("Error al desactivar el pedido:", error);
        res.status(500).json({ error: "Error al desactivar el pedido" });
    }
});

exports.actualizarEstadoPedido = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { estadoPedido_status } = req.body; // Asegúrate de recibir solo el estado del pedido para la actualización
    try {
        const pedidoActualizado = await Pedido.actualizarPedido(id, { estadoPedido_status });
        if (pedidoActualizado) {
            res.redirect("/pedidos")
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el pedido:", error);
        res.status(500).json({ error: "Error al actualizar el pedido" });
    }
});
