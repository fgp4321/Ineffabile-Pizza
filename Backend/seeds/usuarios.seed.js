const User = require("../models/usuarios.model")
const mongoConn = require("../config/mongoDB.config")
const bcrypt = require('bcrypt');

const ejecutar = async () => {
    try {
        await mongoConn.conectarMongoDB();
        console.log("Conexión a MongoDB establecida...");

        const users = [
            {
                nombre: "user_nombre",
                apellido: "user_apellido",
                username: "user",
                email: "user@gmail.com",
                password: "user",
                telefono: 687256871,
                rol: "USER",
                imageUrl:"/images/utils/profiles/perfil.jpg"
            },
            {
                nombre: "Encargado",
                apellido: "Encargado",
                username: "Encargado",
                email: "encargado@gmail.com",
                password: "encargado",
                telefono: 693235687,
                rol: "EMPLOYEE",
                imageUrl:"/images/utils/profiles/ineffabile.png"
            },
            {
                nombre: "Admin",
                apellido: "Admin",
                username: "Admin",
                email: "admin@gmail.com",
                password: "admin",
                telefono: 655288769,
                rol: "ADMIN",
                imageUrl:"/images/utils/profiles/ineffabile.png"
            }
        ];

        // Encriptar contraseñas antes de insertar
        const saltRounds = 12;
        for (let user of users) {
            user.password = await bcrypt.hash(user.password, saltRounds);
        }

        const result = await User.insertMany(users);
        console.log("Índices y documentos creados correctamente");

    } catch (err) {
        console.error("Error en la operación:", err);
    } finally {
        await mongoConn.close();
        process.exit();
    }
};

ejecutar();