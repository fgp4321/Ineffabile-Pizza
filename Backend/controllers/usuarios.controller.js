const User = require("../models/usuarios.model")
const wrapAsync = require("../utils/wrapAsync")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//AUTENTICACIÓN

exports.register = async function(req, res) {
    try {
        const { nombre, apellido, username, email, password, telefono } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Puedes utilizar SweetAlert2 para mostrar una alerta de error
            console.error({"err":"Usuario ya existente"})
            res.redirect("/usuarios/login-register")
        }

        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            nombre,
            apellido,
            username,
            email,
            password: hashedPassword,
            telefono,
            rol: 'USER'
        });

        await newUser.save();

        // Puedes utilizar SweetAlert2 para mostrar una alerta de éxito
        res.redirect("/usuarios/login-register");
    } catch (error) {
        console.error({"err":"Error al registrar el usuario"})
        // Puedes utilizar SweetAlert2 para mostrar una alerta de error genérico
        res.status(401).json({"err":"Error interno del servidor"})
    }
};

//LOGIN

exports.login = async function(req, res) {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Cambia por tu propia clave secreta
            { expiresIn: '1h' }
        );

        // Renderizar la vista home.ejs
        res.render('home');


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = (req, res) => {
    // Implementa la lógica de cierre de sesión según sea necesario
    // Aquí podrías limpiar la sesión o invalidar el token JWT
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
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
