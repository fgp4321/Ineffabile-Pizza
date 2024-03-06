const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//AUTENTICACIÓN
exports.showLogin = function(req,res){
    res.render("")
}

exports.showRegister = function(req,res){
    res.render("")
}

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





//CRUD
exports.buscarTodosUsuarios = wrapAsync(async (req,res) => {
    await User.findUsers((error,usuarios)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.status(200).json(usuarios)            
        }
    })
})

exports.buscarPorId = wrapAsync(async (req,res) => {
    const {NIF} = req.params
    await User.findById(NIF,(error,usuario)=>{
        if(error){
            res.status(500).json(error)
        }else{
            if(usuario.length > 0){
                res.status(200).json(usuario)
            }else{
                res.status(404).json({msg:"Usuario no encontrado"})
            }            
        }
    })
})

exports.crearUsuario = wrapAsync(async (req,res) => {
    const nuevoUsuario = new Usuario(req.body)
    await User.create(nuevoUsuario,(error,usuarioCreado)=>{
        if(error){
            res.status(500).json(error)
        }else{            
            res.status(200).json(usuarioCreado)                   
        }
    })
})

exports.actualizarUsuario = wrapAsync(async (req,res) => {
    const usuarioParaActualizar = new Usuario(req.body)
    const {NIF} = req.params
    await User.actualizarUser(NIF,usuarioParaActualizar,(error,usuarioActualizado)=>{
        if(error){
            res.status(500).json(error)
        }else{            
            res.status(200).json(usuarioActualizado)                               
        }
    })
})

exports.eliminarUsuario = wrapAsync(async (req,res) => {    
    const {NIF} = req.params
    await User.eliminarUser(NIF,(error,usuarioEliminado)=>{
        if(error){
            res.status(500).json(error)
        }else{            
            res.status(200).json(usuarioEliminado)                       
        }
    })
})