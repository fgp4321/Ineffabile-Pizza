const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    apellido: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN","USER"]
    }
})

const User = mongoose.model("User", userSchema)

//Registrar Usuarios
User.crearUsuario = async (nuevoUsuario) => {
    try {
        const usuarioCreado = await User.create(nuevoUsuario)
        return nuevoUsuario;
    } catch (error) {
        throw error
    }
};

User.buscarPorId = async function (usuarioId) {
    try {
        const usuario = await User.findById(usuarioId)
        if (usuario) {
            return usuario
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

//Auxiliar para Login
User.buscarPorEmail = async function (email) {
    try {
        const usuario = await User.findOne({ email });
        if (usuario) {
            return usuario;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

User.findUsers = async function(){
    try {
        const usuarios = await User.find()
        return usuarios
    } catch (error) {
        throw error;
    }
}

User.actualizarUsuario = async function (userId, datosActualizados) {
    try {
        const usuarioActualizado = await User.findByIdAndUpdate(userId, datosActualizados, { new: true })
        if (usuarioActualizado) {
            return usuarioActualizado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

User.eliminarUsuario = async function (usuarioId) {
    try {
        const usuarioEliminado = await User.findByIdAndDelete(usuarioId)
        if (usuarioEliminado) {
            return usuarioEliminado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

module.exports = User