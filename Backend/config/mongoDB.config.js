const mongoose = require("mongoose")
const mongoConn = mongoose.createConnection()

mongoConn.conectarMongoDB = async()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Ineffabile")
}

mongoConn.establecerConexion = async()=>{
    try{
        await mongoConn.conectarMongoDB()
        .then(()=>{
            console.log("Conectado satisfactoriamente con MongoDB")
        })
        .catch((err)=>{
            console.log("Error al intentar conectar con MongoDB: " + err)
            process.exit(0)
        })
    }catch(error){
        console.log("Error al intentar conectar con MongoDB: " + error)
        process.exit(0)
    }
}

module.exports = mongoConn