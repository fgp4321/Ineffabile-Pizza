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
            productos_nombre: ["Pizza 4 quesos", "Patatas fritas"],
            fecha: new Date(),
            cantidad: 2,
            total: "50",
            estadoPedido_status: "Efectuado"
        },
        {
            usuario_nombre: "Alex",
            productos_nombre: ["Macarrones Carbonara", "Pizza de jamon york y quesos", "Alitas de pollo"],
            fecha: new Date(),
            cantidad: 3,
            total: "75",
            estadoPedido_status: "Preparado"
        },
        {
            usuario_nombre: "Fran",
            productos_nombre: ["Espagueti boloñesa"],
            fecha: new Date(),
            cantidad: 1,
            total: "30",
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