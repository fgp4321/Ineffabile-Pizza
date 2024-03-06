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
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN","USER"]
    }
})

const User = mongoose.model("User", userSchema)

//Registrar Usuarios
User.create = async function(newUser, result){
    await newUser.save()
    .then(function(data){
        result(data, null)
    }).catch(function(err){
        result(null, err)
    })
}

//Auxiliar para Login
User.findById = async function(id_param, result){
    const userFound = await User.findOne({ _id: id_param})
    if(userFound){
        result(userFound,null)
    }else{
        result(null, {"err":"No hay usuarios con ese ID"})
    }
}


User.findUsers = async function(result){
    const users = await User.find()
    if(users){
        result(users,null)
    }else{
        result(null, {"err":"No hay usuarios en la base de datos"})
    }
}

User.actualizarUser = async function (userId, datosActualizados) {
    try {
        const userActualizado = await User.findByIdAndUpdate(userId, datosActualizados, { new: true })
        if (userActualizado) {
            return userActualizado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
};

User.eliminarUser = async function (userId) {
    try {
        const userEliminado = await User.findByIdAndDelete(userId)
        if (userEliminado) {
            return userEliminado
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}

module.exports = User