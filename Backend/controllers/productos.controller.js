const Producto = require("../models/productos.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")

exports.obtenerTodosProductos = wrapAsync(async (req, res) => {
    try {
        const productos = await Producto.findProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" })
    }
})

exports.buscarProductosQuery = async (req, res) => {
    const { query } = req.body;
    try {
      const productos = await Producto.find({ nombre: { $regex: query, $options: 'i' } });
      res.json(productos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.buscarPorId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.buscarPorId(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ msg: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        res.status(500).json({ error: "Error interno al obtener el producto por ID" });
    }
});

exports.crearProducto = wrapAsync(async (req, res) => {
    const nuevoProducto = req.body
    try {
        const productoCreado = await Producto.create(nuevoProducto)
        res.status(200).json(productoCreado)
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" })
    }
});


exports.actualizarProducto = wrapAsync(async (req, res) => {
    const { id } = req.params
    const datosActualizados = req.body
    try {
        const productoActualizado = await Producto.actualizarProducto(id, datosActualizados)
        if (productoActualizado) {
            res.status(200).json(productoActualizado)
        } else {
            res.status(404).json({ msg: "Producto no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" })
    }
})

exports.eliminarProducto = wrapAsync(async (req, res) => {
    const { id } = req.params
    try {
        const productoEliminado = await Producto.eliminarUsuario(id)
        if (productoEliminado) {
            res.status(200).json(productoEliminado)
        } else {
            res.status(404).json({ msg: "Producto no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" })
    }
})
