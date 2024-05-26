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
            usuario_nombre: "user",
            productos: [
                { nombre: "Pizza 4 quesos", cantidad: 1 },
                { nombre: "Pizza Vegetal", cantidad: 1 },
                { nombre: "Patatas alioli", cantidad: 1 }
            ],
            fecha: new Date(),
            cantidad: 3,
            total: "24.20",
            estadoPedido_status: "Efectuado",
            isActive: false
        },
        {
            usuario_nombre: "user",
            productos: [
                { nombre: "Macarrones a la boloñesa", cantidad: 1 },
                { nombre: "Pizza atún", cantidad: 1 },
                { nombre: "Alitas de pollo", cantidad: 1 }
            ],
            fecha: new Date(),
            cantidad: 3,
            total: "27.50",
            estadoPedido_status: "Preparado",
            isActive: true
        },
        {
            usuario_nombre: "user",
            productos: [
                { nombre: "Espaguetis a la carbonara", cantidad: 1 }
            ],
            fecha: new Date(),
            cantidad: 1,
            total: "8.50",
            estadoPedido_status: "Listo",
            isActive: true
        }
    ];

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