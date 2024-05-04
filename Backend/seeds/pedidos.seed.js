const Pedido = require("../models/pedidos.model")
const mongoConn = require("../config/mongoDB.config")

const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Conexión a MongoDB establecida...")
    })
    .catch((err)=>{
        console.log(err)
    })

    const pedidos = [
        {
            usuario_nombre: "Mario",
            productos_nombre: ["Pizza 4 quesos", "Pizza Vegetal", "Patatas alioli"],
            fecha: new Date(),
            cantidad: 2,
            total: "24.20",
            estadoPedido_status: "Efectuado"
        },
        {
            usuario_nombre: "Alex",
            productos_nombre: ["Macarrones a la boloñesa", "Pizza atún", "Alitas de pollo"],
            fecha: new Date(),
            cantidad: 3,
            total: "27.50",
            estadoPedido_status: "Preparado"
        },
        {
            usuario_nombre: "Fran",
            productos_nombre: ["Espaguetis a la carbonara"],
            fecha: new Date(),
            cantidad: 1,
            total: "8.50",
            estadoPedido_status: "Listo"
        }
    ]

    await Pedido.insertMany(pedidos)
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