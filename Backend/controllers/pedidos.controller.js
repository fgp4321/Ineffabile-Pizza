const Pedido = require("../models/pedidos.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")

exports.obtenerPedidosPorUsuario = wrapAsync(async (req, res) => {
    if (!req.session.userLogued) {
        return res.redirect('/usuarios/login-register');
    }
    try {
        const pedidos = await Pedido.find({ usuario_nombre: req.session.userLogued.username });
        res.render('mis-pedidos.ejs', { pedidos });
    } catch (error) {
        console.error("Error al obtener pedidos por usuario:", error);
        res.status(500).json({ error: "Error interno al obtener pedidos" });
    }
});

exports.obtenerTodosPedidos = wrapAsync(async (req, res) => {
    if (!req.session.userLogued || req.session.userLogued.rol !== "EMPLOYEE") {
        return res.status(401).send("Acceso no autorizado");
    }
    try {
        const pedidos = await Pedido.findPedidos();
        res.render('pedidos.ejs', { pedidos });
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
    const nuevoPedido = req.body
    try {
        const pedidoCreado = await Pedido.crearPedido(nuevoPedido)
        res.status(200).json(pedidoCreado)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el pedido" })
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
    console.log("Desactivando pedido", req.params.id);
    const { id } = req.params;
    try {
        const pedidoDesactivado = await Pedido.desactivarPedido(id);
        if (pedidoDesactivado) {
            res.status(200).json({ msg: "Pedido desactivado correctamente" });
        } else {
            res.status(404).json({ msg: "Pedido no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al desactivar el pedido" });
    }
});
