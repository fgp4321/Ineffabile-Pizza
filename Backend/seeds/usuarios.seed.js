const User = require("../models/usuarios.model")
const mongoConn = require("../config/mongoDB.config")

const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Creando base de datos y documentos...")
    })
    .catch((err)=>{
        console.log(err)
    })

    const users = [
        {   
            nombre:"Prueba",
            apellido:"Prueba",
            username:"Prueba_25",
            email:"prueba@gmail.com",
            password:"prueba123",
            rol:"USER"
        }
    ]

    await User.insertMany(users)
    .then((res)=>{
        console.log("Índices y documentos creados correctamente")
    })
    .catch((err)=>{
        console.log(err)
    })

    await mongoConn.close()
    process.exit()
}


ejecutar()