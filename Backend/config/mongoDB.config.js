const mongoose = require("mongoose")
const mongoConn = mongoose.createConnection()

mongoConn.conectarMongoDB = async()=>{
    return mongoose.connect(process.env.MONGODB_URI)
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