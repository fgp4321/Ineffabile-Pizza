const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const path = require('path');
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//AUTENTICACIÓN
//-REGISTER
exports.register = wrapAsync(async function(req, res) {
    const { nombre, apellido, username, email, password, repeatPassword, telefono } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== repeatPassword) {
        req.session.error = "Las contraseñas no coinciden";
        return res.redirect("/usuarios/login-register");
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.buscarPorEmail(email);
    if (existingUser) {
        req.session.error = "El usuario ya existe";
        return res.redirect("/usuarios/login-register");
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
        rol: 'USER',
        imageUrl: '/images/utils/profiles/perfil.jpg' // URL de la imagen de perfil por defecto
    };

    const userCreated = await User.crearUsuario(nuevoUsuario);

    if (!userCreated) {
        throw new AppError("Error al crear usuario", 500);
    }

    // Iniciar sesión automáticamente tras el registro
    const token = jwt.sign(
        { userId: userCreated._id, role: userCreated.rol, check: true },
        process.env.JWT_PASS,
        { expiresIn: '1d' }
    );
    req.session.jwtToken = token;
    req.session.userLogued = userCreated; // Asegúrate de que la sesión incluya la URL de la imagen de perfil

    // Asegurarse de que la sesión se guarde antes de redirigir
    req.session.save((err) => {
        if (err) {
            throw new AppError("Error al guardar la sesión", 500);
        }
        res.redirect("/usuarios/personal-area");
    });
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
            req.session.error = "Usuario y/o contraseña incorrectos";
            res.redirect('/usuarios/login-register');
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
            req.session.error = "Usuario y/o contraseña incorrectos";
            res.redirect('/usuarios/login-register');
        }
    } catch (error) {
        req.session.error = "Error interno del servidor";
            res.redirect('/usuarios/login-register');
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

exports.buscarUsuariosPorNombre = wrapAsync(async (req, res) => {
    const { query } = req.query;
    try {
        const usuarios = await User.find({ nombre: { $regex: query, $options: "i" } });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar usuarios" });
    }
});

exports.uploadProfilePic = wrapAsync(async (req, res) => {
    try {
        const userId = req.session.userLogued._id; // Usando el ID del usuario desde la sesión
        const imageUrl = `/images/utils/profiles/${req.file.filename}`;

        // Actualizar la URL de la imagen en la base de datos
        await User.findByIdAndUpdate(userId, { imageUrl: imageUrl });

        // Actualizar la sesión del usuario con la nueva URL de la imagen
        req.session.userLogued.imageUrl = imageUrl;

        // Asegurarse de que la sesión se guarde antes de redirigir
        req.session.save((err) => {
            if (err) {
                throw new AppError("Error al guardar la sesión", 500);
            }
            res.json({ imageUrl: imageUrl }); // Responder con la nueva URL de la imagen
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir la imagen de perfil');
    }
});
