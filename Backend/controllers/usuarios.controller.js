const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//AUTENTICACIÓN
/*
exports.register = async function(req,res){
    const newUser = new User(req.body)

    newUser.password = await bcrypt.hash(newUser.password, 12)

    await User.create(newUser,function(userCreated,err){
        if(err){
            res.status(500).json(err)
        }else{
            res.redirect("")
        }
    })
}

exports.login = async function(req,res){
    const { username, password } = req.body   

    const pwd_textoPlano = password
    let userFoundData = null

    await User.findByUsername(username,function(userFound,err){
        if(err){
            res.status(500).json(err)
        }else{
            userFoundData = userFound
        }
    })

    if(userFoundData){
        const validado = await bcrypt.compare(pwd_textoPlano, userFoundData.password)

        if(validado){
            //CREAR TOKEN JWT
            const token = jwt.sign(
                {check:true},
                process.env.JWT_PASS,
                {expiresIn:1440}
            )            
            req.session.jwtToken = token
            req.session.userLogued = userFoundData
            res.redirect("")
        }else{
            res.status(401).json({"err":"Usuario y/o contraseña incorrectos"})
        }
    }
}

exports.logout = (req, res) => {
    jwt.sign(req.session.jwtToken,"", {expiresIn:1}, (logout,err) => {
        if (err) {
            console.error({"err":"Error al destruir la sesión"})
        } else {
            req.session.destroy()
            res.redirect("")
        }
    })
}
*/

exports.mostrarLoginRegistro = function(req,res){
    res.render("login-register.ejs")
}

//CRUD
exports.buscarTodosUsuarios = wrapAsync(async (req, res) => {
    try {
        const usuarios = await User.findUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" })
    }
});

exports.buscarPorId = wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await User.buscarPorId(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el usuario por ID:", error);
        res.status(500).json({ error: "Error interno al obtener el usuario por ID" });
    }
});

exports.crearUsuario = wrapAsync(async (req, res) => {
    const nuevoUsuario = req.body
    try {
        const usuarioCreado = await User.create(nuevoUsuario)
        res.status(200).json(usuarioCreado)
    } catch (error) {
        res.status(500).json({ error: "Error al crear al usuario" })
    }
});


exports.actualizarUsuario = wrapAsync(async (req, res) => {
    const { id } = req.params
    const datosActualizados = req.body
    try {
        const usuarioActualizado = await User.actualizarUsuario(id, datosActualizados)
        if (usuarioActualizado) {
            res.status(200).json(usuarioActualizado)
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar usuario" })
    }
})

exports.eliminarUsuario = wrapAsync(async (req, res) => {
    const { id } = req.params
    try {
        const usuarioEliminado = await User.eliminarUsuario(id)
        if (usuarioEliminado) {
            res.status(200).json(usuarioEliminado)
        } else {
            res.status(404).json({ msg: "Usuario no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" })
    }
})
