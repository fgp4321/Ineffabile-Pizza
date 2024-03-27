const Producto = require("../models/productos.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")
//const { Client } = require('@elastic/elasticsearch');
//const client = new Client({ node: 'http://localhost:9200' }); // Configura la conexión a Elasticsearch

exports.obtenerTodosProductos = wrapAsync(async (req, res) => {
    try {
        const productos = await Producto.findProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" })
    }
})

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


/*
//Búsqueda con elasticsearch
exports.renderizarDetallesProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            throw new AppError("Producto no encontrado", 404);
        }
        // Renderiza una vista parcial (por ejemplo, productoDetalles.ejs) con los detalles del producto
        res.render('partials/productoDetalles', { producto });
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
        res.status(error.statusCode || 500).json({ error: error.message || "Error interno al obtener el producto por ID" });
    }
};

exports.obtenerTodosProductos = async (req, res) => {
    try {
        const query = req.body.query; // Obtén la consulta de búsqueda del cuerpo de la solicitud

        // Realiza una búsqueda de texto completo en Elasticsearch
        const { body } = await client.search({
            index: 'productos', // Nombre de tu índice en Elasticsearch
            body: {
                query: {
                    match: {
                        nombre: query // Campo en el que deseas buscar
                    }
                }
            }
        });

        const resultados = body.hits.hits.map(hit => hit._source); // Extrae los resultados de la respuesta

        // Renderiza la vista resultados.ejs y pasa los resultados como datos
        res.render('resultados', { resultados });
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error al buscar productos' });
    }
};*/
