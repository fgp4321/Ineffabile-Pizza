const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const path = require('path');
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//AUTENTICACIÓN
//-REGISTER
exports.register = wrapAsync(async function(req, res) {
    const { nombre, apellido, username, email, password, telefono } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.buscarPorEmail(email);
    if (existingUser) {
        res.redirect("/usuarios/login-register");
        return; // Detener la ejecución del controlador si el usuario ya existe
    }

    // Crear un nuevo usuario utilizando la función del modelo
    const hashedPassword = await bcrypt.hash(password, 12);
    const nuevoUsuario = {
        nombre,
        apellido,
        username,
        email,
        password: hashedPassword,
        telefono,
        rol: 'USER'
    };

    const userCreated = await User.crearUsuario(nuevoUsuario);

    if (!userCreated) {
        throw new AppError("Error al crear usuario", 500);
    }

    // Iniciar sesión automáticamente tras el registro
    // Crear token JWT
    const token = jwt.sign(
        { userId: userCreated._id, check: true },
        process.env.JWT_PASS,
        { expiresIn: '1d' }
    );
    req.session.jwtToken = token;
    req.session.userLogued = userCreated;

    // Redireccionar a la página de área personal
    res.redirect("/usuarios/personal-area");
});


exports.login = async function(req, res) {
    const { login, password } = req.body; // 'login' puede ser email o username

    try {
        // Primero intentar buscar por email
        let userFound = await User.buscarPorEmail(login);
        
        // Si no se encuentra por email, intentar por username
        if (!userFound) {
            userFound = await User.buscarPorUsername(login);
        }

        // Si aún así no se encuentra, devolver error
        if (!userFound) {
            res.status(401).json({"err": "Usuario y/o contraseña incorrectos"});
            return;
        }

        // Verificar la contraseña
        const validado = await bcrypt.compare(password, userFound.password);

        if (validado) {
            // Crear token JWT con más información sobre el usuario
            const token = jwt.sign(
                { 
                    id: userFound.id,  // Asegura la identificación del usuario
                    role: userFound.rol,  // Asegura el rol del usuario
                    check: true
                },
                process.env.JWT_PASS,
                { expiresIn: '24h' }
            );
            req.session.jwtToken = token;
            req.session.userLogued = userFound;

            // Redireccionar dependiendo del rol del usuario
            if (userFound.rol === 'ADMIN') {
                // Si el usuario es ADMIN, redireccionar a localhost:4200
                res.redirect("http://localhost:4200");
            } else {
                // Redireccionar a la página de área personal si no es ADMIN
                res.redirect("/usuarios/personal-area");
            }
        } else {
            res.status(401).json({"err": "Usuario y/o contraseña incorrectos"});
        }
    } catch (error) {
        res.status(500).json({"err": "Error interno del servidor"});
    }
};



exports.logout = (req, res) => {
    jwt.sign(req.session.jwtToken, "", { expiresIn: 1 }, (logout, err) => {
        if (err) {
            console.error({"err":"Error al destruir la sesión"});
        } else {
            req.session.destroy();
            res.redirect("/");
        }
    });
};


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
    const nuevoUsuario = req.body;
    const password = nuevoUsuario.password; // Suponiendo que el campo de la contraseña se llama 'password'

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Actualizar el objeto nuevoUsuario con la contraseña encriptada
        nuevoUsuario.password = hashedPassword;

        // Crear el usuario con la contraseña encriptada
        const usuarioCreado = await User.create(nuevoUsuario);
        res.status(200).json(usuarioCreado);
    } catch (error) {
        res.status(500).json({ error: "Error al crear al usuario" });
    }
});


exports.actualizarUsuario = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    let usuarioActualizado;

    try {
        if (datosActualizados.password) {
            const hashedPassword = await bcrypt.hash(datosActualizados.password, 12);
            datosActualizados.password = hashedPassword;
        }

        usuarioActualizado = await User.actualizarUsuario(id, datosActualizados);

        if (usuarioActualizado) {
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
});

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
