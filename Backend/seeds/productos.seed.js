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
            nombre: "Pizza Margarita",
            precio_pvp: "6.20",
            descripcion: "La clásica pizza Margarita con tomate, mozzarella y albahaca fresca.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza 4 quesos",
            precio_pvp: "8.50",
            descripcion: "Clásica pizza de 4 quesos, donde se mezclan a la perfección los clásicos: mozzarella, parmesano, gorgonzola y queso de cabra.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza atún",
            precio_pvp: "8.50",
            descripcion: "Pizza con atún fresco, cebolla, aceitunas negras y salsa de tomate.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Hawaiana",
            precio_pvp: "9.50",
            descripcion: "Pizza con jamón, piña y salsa de tomate.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Vegetal",
            precio_pvp: "6.20",
            descripcion: "Pizza vegetariana con una selección de verduras frescas y queso mozzarella.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Romana",
            precio_pvp: "6.20",
            descripcion: "Pizza estilo Romana con tomate, anchoas y aceitunas negras.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza 4 estaciones",
            precio_pvp: "7.50",
            descripcion: "Pizza dividida en cuatro secciones, cada una con ingredientes representativos de una estación del año.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Vegana",
            precio_pvp: "6.50",
            descripcion: "Pizza totalmente vegetal, sin ingredientes de origen animal.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza Napoli",
            precio_pvp: "7.50",
            descripcion: "Pizza estilo Napolitana con tomate, mozzarella, anchoas, aceitunas negras y alcaparras.",
            categoria_nombre: "Pizzas",
        },
        {
            nombre: "Pizza con setas",
            precio_pvp: "8.50",
            descripcion: "Pizza con una variedad de setas frescas y queso mozzarella.",
            categoria_nombre: "Pizzas",
        },
        // Pastas
        {
            nombre: "Espaguetis a la carbonara",
            precio_pvp: "8.50",
            descripcion: "Espaguetis servidos con una cremosa salsa carbonara y panceta crujiente.",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Tagliatelle con trufa",
            precio_pvp: "9.50",
            descripcion: "Tagliatelle con salsa de trufa negra y queso parmesano rallado.",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Macarrones a la boloñesa",
            precio_pvp: "10.50",
            descripcion: "Macarrones con una abundante salsa boloñesa casera.",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Ravioli de setas",
            precio_pvp: "10.50",
            descripcion: "Ravioli rellenos de una deliciosa mezcla de setas silvestres.",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Tortellini de carne",
            precio_pvp: "7.50",
            descripcion: "Tortellini rellenos de carne de ternera y cerdo, servidos con salsa de tomate.",
            categoria_nombre: "Pastas",
        },
        {
            nombre: "Gnocchi con aceite de oliva y hierbas",
            precio_pvp: "10.50",
            descripcion: "Gnocchi servidos con una mezcla de aceite de oliva, ajo y hierbas frescas.",
            categoria_nombre: "Pastas",
        },
        // Complementos
        {
            nombre: "Nachos con queso",
            precio_pvp: "5.50",
            descripcion: "Nachos crujientes cubiertos con queso fundido, jalapeños y salsa.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Bolas de queso",
            precio_pvp: "5.50",
            descripcion: "Bolas de queso mozzarella empanizadas y fritas, servidas con salsa marinara.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Aros de cebolla",
            precio_pvp: "6.50",
            descripcion: "Aros de cebolla crujientes y dorados, acompañados de salsa BBQ.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Fritos de pescado",
            precio_pvp: "8.50",
            descripcion: "Variedad de pescado rebozado y frito, acompañado de salsa tártara.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Jalapeños fritos",
            precio_pvp: "8.50",
            descripcion: "Jalapeños frescos rellenos de queso crema, empanizados y fritos hasta dorar.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Croquetas de jamón",
            precio_pvp: "9.50",
            descripcion: "Croquetas caseras de jamón serrano, cremosas por dentro y crujientes por fuera.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Alitas de pollo",
            precio_pvp: "8.50",
            descripcion: "Alitas de pollo marinadas y horneadas a la perfección, acompañadas de salsa barbacoa.",
            categoria_nombre: "Complementos",
        },
        {
            nombre: "Patatas alioli",
            precio_pvp: "9.50",
            descripcion: "Patatas fritas caseras servidas con salsa alioli.",
            categoria_nombre: "Complementos",
        },
        // Bebidas
        {
            nombre: "Agua mineral",
            precio_pvp: "1.5",
            descripcion: "Agua mineral natural embotellada.",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Agua con gas",
            precio_pvp: "1.5",
            descripcion: "Agua con gas natural en botella.",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Refresco de naranja",
            precio_pvp: "2",
            descripcion: "Refresco de naranja con gas en lata.",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Refresco de limón",
            precio_pvp: "2",
            descripcion: "Refresco de limón con gas en lata.",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Cerveza",
            precio_pvp: "2.5",
            descripcion: "Cerveza fría en botella de cristal.",
            categoria_nombre: "Bebidas",
        },
        {
            nombre: "Té al limón",
            precio_pvp: "2.5",
            descripcion: "Té caliente con limón y azúcar.",
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
