const estadoPedido = require("../models/estado-pedido.model");
const mongoConn = require("../config/mongoDB.config");

const ejecutar = async () => {
    await mongoConn.conectarMongoDB()
        .then(() => {
            console.log("Conexión a MongoDB establecida...");
        })
        .catch((err) => {
            console.log(err);
        });

    const estados = ["Efectuado", "Preparado", "Listo", "Entregado"];
    const pagos = ["Efectivo", "Credito", "Debito", "Transferencia"];

    const estadosPedidos = [];

    estados.forEach((estado) => {
        pagos.forEach((pago) => {
            estadosPedidos.push({
                status: estado,
                payment: pago
            });
        });
    });

    await estadoPedido.insertMany(estadosPedidos)
        .then((res) => {
            console.log("Índices y documentos creados correctamente");
        })
        .catch((err) => {
            console.log(err);
        });

    await mongoConn.close();
    process.exit();
};

ejecutar();
