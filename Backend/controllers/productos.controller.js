const Producto = require("../models/productos.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")
const upload = require('../middlewares/multer');

exports.obtenerTodosProductos = wrapAsync(async (req, res) => {
    try {
        const productos = await Producto.findProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" })
    }
})

exports.buscarProductosQuery = async (req, res) => {
    const { query } = req.query; // Accede al parámetro de búsqueda a través de req.query
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

exports.obtenerProductosPorCategoria = async (req, res) => {
    const categoria = req.params.categoria;
    try {
      const productos = await Producto.find({ categoria_nombre: categoria });
      res.render('bebidas', { bebidas: productos }); // Ajusta esto según la categoría
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Crear Producto con imagen
exports.crearProducto = wrapAsync(async (req, res) => {
    const { nombre, descripcion, precio_pvp, precio_oferta, categoria_nombre } = req.body;
    const imagen1 = req.file ? req.file.filename : null;

    try {
        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio_pvp,
            precio_oferta,
            categoria_nombre,
            imagen1
        });

        const productoCreado = await Producto.crearProducto(nuevoProducto);
        res.status(200).json(productoCreado);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});


exports.actualizarProducto = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio_pvp, precio_oferta, categoria_nombre } = req.body;
  let imagen1 = req.body.imagen1;

  if (req.file) {
    imagen1 = req.file.filename;
  }

  const datosActualizados = { nombre, descripcion, precio_pvp, precio_oferta, categoria_nombre, imagen1 };

  try {
    const productoActualizado = await Producto.actualizarProducto(id, datosActualizados);
    if (productoActualizado) {
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

exports.eliminarProducto = wrapAsync(async (req, res) => {
    const { id } = req.params
    try {
        const productoEliminado = await Producto.eliminarProducto(id)
        if (productoEliminado) {
            res.status(200).json(productoEliminado)
        } else {
            res.status(404).json({ msg: "Producto no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" })
    }
})

exports.buscarProductosPorNombre = wrapAsync(async (req, res) => {
    const { query } = req.query;
    try {
        const productos = await Producto.find({ nombre: { $regex: query, $options: "i" } });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar productos" });
    }
});
