const Producto = require("../models/productos.model");
const mongoConn = require("../config/mongoDB.config");

const ejecutar = async () => {
    await mongoConn.conectarMongoDB()
        .then(() => {
            console.log("Conexión a MongoDB establecida...");
        })
        .catch((err) => {
            console.log(err);
        });

    const productos = [
        // Pizzas
        {
            nombre: "Pizza 4 quesos",
            descripcion: "Clásica pizza de 4 quesos, donde se mezclan a la perfección los clásicos: mozzarella, parmesano, gorgonzola y queso de cabra.",
            precio_pvp: "12.95",
            precio_oferta: "7.50",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Margarita",
            descripcion: "La clásica pizza Margarita con tomate, mozzarella y albahaca fresca.",
            precio_pvp: "10.50",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Pepperoni",
            descripcion: "Pizza con deliciosas rodajas de pepperoni y queso mozzarella.",
            precio_pvp: "11.75",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Hawaiana",
            descripcion: "Pizza con jamón, piña y salsa de tomate.",
            precio_pvp: "11.95",
            precio_oferta: "9.50",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Vegetariana",
            descripcion: "Pizza vegetariana con una selección de verduras frescas y queso mozzarella.",
            precio_pvp: "11.25",
            categoria_nombre: "Pizzas",
        },
        // Pastas
        {
            nombre: "Spaghetti Carbonara",
            descripcion: "Pasta italiana con salsa carbonara, panceta y queso parmesano.",
            precio_pvp: "9.95",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Lasagna Bolognese",
            descripcion: "Lasagna casera con carne de res, salsa de tomate y queso mozzarella.",
            precio_pvp: "12.50",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Fettuccine Alfredo",
            descripcion: "Fettuccine con salsa Alfredo cremosa y pollo a la parrilla.",
            precio_pvp: "11.75",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Ravioli de Ricotta y Espinacas",
            descripcion: "Ravioli relleno de ricotta y espinacas, acompañado de salsa marinara.",
            precio_pvp: "10.95",
            precio_oferta: "8.50",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Penne Arrabiata",
            descripcion: "Penne con salsa de tomate picante, ajo y aceite de oliva.",
            precio_pvp: "10.25",
            categoria_nombre: "Pastas",
        },
        // Complementos
        {
            nombre: "Ensalada César",
            descripcion: "Ensalada clásica con lechuga romana, croutones, queso parmesano y aderezo César.",
            precio_pvp: "7.95",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Patatas Fritas",
            descripcion: "Patatas fritas crujientes y doradas.",
            precio_pvp: "4.50",
            precio_oferta: "3.50",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Palitos de Mozzarella",
            descripcion: "Palitos de queso mozzarella empanizados y fritos, servidos con salsa marinara.",
            precio_pvp: "6.95",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Alitas de Pollo BBQ",
            descripcion: "Alitas de pollo bañadas en salsa BBQ, asadas a la parrilla.",
            precio_pvp: "9.25",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Pan de Ajo",
            descripcion: "Pan recién horneado con ajo, mantequilla y perejil.",
            precio_pvp: "5.75",
            categoria_nombre: "Complementos",
        },
        // Bebidas
        {
            nombre: "Refresco de Cola",
            descripcion: "Refresco de cola carbonatado y refrescante.",
            precio_pvp: "2.50",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Agua Mineral",
            descripcion: "Agua mineral natural embotellada.",
            precio_pvp: "1.75",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Jugo de Naranja",
            descripcion: "Jugo de naranja recién exprimido.",
            precio_pvp: "3.25",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Cerveza Artesanal",
            descripcion: "Cerveza artesanal elaborada con los mejores ingredientes.",
            precio_pvp: "4.95",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Café Espresso",
            descripcion: "Café espresso italiano, fuerte y aromático.",
            precio_pvp: "2.75",
            categoria_nombre: "Bebidas",
        }
    ];

    await Producto.insertMany(productos)
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
