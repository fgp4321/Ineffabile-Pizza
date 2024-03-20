const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio_pvp: {
        type: String,
        required: true,
    },
    categoria_nombre: {
        type: String,
    }
})

const Producto = mongoose.model("Producto", productsSchema)

Producto.findProductos = async function(){
    try {
        const productos = await Producto.find()
        return productos
    } catch (error) {
        throw error;
    }
}

Producto.buscarPorId = async function (productId) {
    try {
        const producto = await Producto.findById(productId)
        if (producto) {
            return producto
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

Producto.crearProducto = async (nuevoProducto) => {
    try {
        const productoCreado = await Producto.create(nuevoProducto)
        return nuevoProducto;
    } catch (error) {
        throw error
    }
};

Producto.actualizarProducto = async function (productId, datosActualizados) {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(productId, datosActualizados, { new: true })
        if (productoActualizado) {
            return productoActualizado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

Producto.eliminarProducto = async function (productoId) {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(productoId)
        if (productoEliminado) {
            return productoEliminado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

module.exports = Producto