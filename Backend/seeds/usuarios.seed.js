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
            nombre:"Mario",
            apellido:"Parra",
            username:"mario_parra31",
            email:"marioparra@gmail.com",
            password:"mario",
            telefono:687256871,
            rol:"USER"
        },
        {   
            nombre:"Fran",
            apellido:"Gonzalez",
            username:"fran-gon65",
            email:"frangonzalez@hotmail.com",
            password:"fran",
            telefono:693235687,
            rol:"USER"
        },
        {   
            nombre:"Alexander",
            apellido:"Sanchez",
            username:"alex_sanch22",
            email:"alexsan@outlook.com",
            password:"alex",
            telefono:655288769,
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