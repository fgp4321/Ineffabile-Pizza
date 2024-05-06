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
        // 10 Pizzas
        {
            nombre: "Pizza Margarita",
            precio_pvp: "6.20",
            descripcion: "La clásica pizza Margarita con tomate, mozzarella y albahaca fresca.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-margarita1.png",
            imagen2: "pizza-margarita2.jpg",
            imagen3: "pizza-margarita3.jpg"
        },
        {
            nombre: "Pizza 4 quesos",
            precio_pvp: "8.50",
            precio_oferta: "5.99",
            descripcion: "Clásica pizza de 4 quesos, donde se mezclan a la perfección los clásicos: mozzarella, parmesano, gorgonzola y queso de cabra.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-4quesos1.png",
            imagen2: "pizza-4quesos2.jpg",
            imagen3: "pizza-4quesos3.jpg"
        },
        {
            nombre: "Pizza atún",
            precio_pvp: "8.50",
            descripcion: "Pizza con atún fresco, cebolla, aceitunas negras y salsa de tomate.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-atun1.png",
            imagen2: "pizza-atun2.jpg",
            imagen3: "pizza-atun3.jpg"
        },
        {
            nombre: "Pizza Hawaiana",
            precio_pvp: "9.50",
            descripcion: "Pizza con jamón, piña y salsa de tomate.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-hawaiana1.png",
            imagen2: "pizza-hawaiana2.jpg",
            imagen3: "pizza-hawaiana3.jpg"
        },
        {
            nombre: "Pizza Vegetal",
            precio_pvp: "6.20",
            precio_oferta: "4.99",
            descripcion: "Pizza vegetariana con una selección de verduras frescas y queso mozzarella.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-vegetal1.png",
            imagen2: "pizza-vegetal2.jpg",
            imagen3: "pizza-vegetal3.jpg"
        },
        {
            nombre: "Pizza Romana",
            precio_pvp: "6.20",
            descripcion: "Pizza estilo Romana con tomate, anchoas y aceitunas negras.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-romana1.png",
            imagen2: "pizza-romana2.jpg",
            imagen3: "pizza-romana3.jpg"
        },
        {
            nombre: "Pizza 4 estaciones",
            precio_pvp: "7.50",
            precio_oferta: "4.99",
            descripcion: "Pizza dividida en cuatro secciones, cada una con ingredientes representativos de una estación del año.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-4estaciones1.png",
            imagen2: "pizza-4estaciones2.jpg",
            imagen3: "pizza-4estaciones3.jpg"
        },
        {
            nombre: "Pizza Vegana",
            precio_pvp: "6.50",
            precio_oferta: "4.99",
            descripcion: "Pizza totalmente vegetal, sin ingredientes de origen animal.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-vegana1.png",
            imagen2: "pizza-vegana2.jpg",
            imagen3: "pizza-vegana3.jpg"
        },
        {
            nombre: "Pizza Napoli",
            precio_pvp: "7.50",
            descripcion: "Pizza estilo Napolitana con tomate, mozzarella, anchoas, aceitunas negras y alcaparras.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-napoli1.png",
            imagen2: "pizza-napoli2.jpg",
            imagen3: "pizza-napoli3.jpg"
        },
        {
            nombre: "Pizza con setas",
            precio_pvp: "8.50",
            descripcion: "Pizza con una variedad de setas frescas y queso mozzarella.",
            categoria_nombre: "Pizzas",
            imagen1: "pizza-setas1.png",
            imagen2: "pizza-setas2.jpg",
            imagen3: "pizza-setas3.jpg"
        },
        //6 Pastas
        {
            nombre: "Espaguetis a la carbonara",
            precio_pvp: "8.50",
            precio_oferta: "6.99",
            descripcion: "Espaguetis servidos con una cremosa salsa carbonara y panceta crujiente.",
            categoria_nombre: "Pastas",
            imagen1: "espaguetis-carbonara1.png",
            imagen2: "espaguetis-carbonara2.jpg",
            imagen3: "espaguetis-carbonara3.jpg"
        },
        {
            nombre: "Tagliatelle con trufa",
            precio_pvp: "9.50",
            precio_oferta: "6.99",
            descripcion: "Tagliatelle con salsa de trufa negra y queso parmesano rallado.",
            categoria_nombre: "Pastas",
            imagen1: "tagliatelle-trufa1.png",
            imagen2: "tagliatelle-trufa2.jpg",
            imagen3: "tagliatelle-trufa3.jpg"
        },
        {
            nombre: "Macarrones a la boloñesa",
            precio_pvp: "10.50",
            precio_oferta: "8.50",
            descripcion: "Macarrones con una abundante salsa boloñesa casera.",
            categoria_nombre: "Pastas",
            imagen1: "macarrones-boloñesa1.png",
            imagen2: "macarrones-boloñesa2.jpg",
            imagen3: "macarrones-boloñesa3.jpg"
        },
        {
            nombre: "Ravioli de setas",
            precio_pvp: "10.50",
            descripcion: "Ravioli rellenos de una deliciosa mezcla de setas silvestres.",
            categoria_nombre: "Pastas",
            imagen1: "ravioli-setas1.png",
            imagen2: "ravioli-setas2.jpg",
            imagen3: "ravioli-setas3.jpg"
        },
        {
            nombre: "Tortellini de carne",
            precio_pvp: "7.50",
            descripcion: "Tortellini rellenos de carne de ternera y cerdo, servidos con salsa de tomate.",
            categoria_nombre: "Pastas",
            imagen1: "tortellini-carne1.png",
            imagen2: "tortellini-carne2.jpg",
            imagen3: "tortellini-carne3.jpg"
        },
        {
            nombre: "Gnocchi con aceite de oliva y hierbas",
            precio_pvp: "10.50",
            precio_oferta: "7.99",
            descripcion: "Gnocchi servidos con una mezcla de aceite de oliva, ajo y hierbas frescas.",
            categoria_nombre: "Pastas",
            imagen1: "gnocchi1.png",
            imagen2: "gnocchi2.jpg",
            imagen3: "gnocchi3.jpg"
        },
        //8 Complementos
        {
            nombre: "Nachos con queso",
            precio_pvp: "5.50",
            descripcion: "Nachos crujientes cubiertos con queso fundido, jalapeños y salsa.",
            categoria_nombre: "Complementos",
            imagen1: "nachos-con-queso1.jpg",
            imagen2: "nachos-con-queso2.jpg",
            imagen3: "nachos-con-queso3.jpg"
        },
        {
            nombre: "Bolas de queso",
            precio_pvp: "5.50",
            descripcion: "Bolas de queso mozzarella empanizadas y fritas, servidas con salsa marinara.",
            categoria_nombre: "Complementos",
            imagen1: "bolas-queso1.jpg",
            imagen2: "bolas-queso2.jpg",
            imagen3: "bolas-queso3.jpg"
        },
        {
            nombre: "Aros de cebolla",
            precio_pvp: "6.50",
            precio_oferta: "4.99",
            descripcion: "Aros de cebolla crujientes y dorados, acompañados de salsa BBQ.",
            categoria_nombre: "Complementos",
            imagen1: "aros-cebolla1.jpg",
            imagen2: "aros-cebolla2.jpg",
            imagen3: "aros-cebolla3.jpg"
        },
        {
            nombre: "Fritos de pescado",
            precio_pvp: "8.50",
            descripcion: "Variedad de pescado rebozado y frito, acompañado de salsa tártara.",
            categoria_nombre: "Complementos",
            imagen1: "fritos-pescado1.jpg",
            imagen2: "fritos-pescado2.jpg",
            imagen3: "fritos-pescado3.jpg"
        },
        {
            nombre: "Jalapeños fritos",
            precio_pvp: "8.50",
            precio_oferta: "6.99",
            descripcion: "Jalapeños frescos rellenos de queso crema, empanizados y fritos hasta dorar.",
            categoria_nombre: "Complementos",
            imagen1: "jalapeños-fritos1.jpg",
            imagen2: "jalapeños-fritos2.jpg",
            imagen3: "jalapeños-fritos3.jpg"
        },
        {
            nombre: "Croquetas de jamón",
            precio_pvp: "9.50",
            descripcion: "Croquetas caseras de jamón serrano, cremosas por dentro y crujientes por fuera.",
            categoria_nombre: "Complementos",
            imagen1: "croquetas-jamon1.jpg",
            imagen2: "croquetas-jamon2.jpg",
            imagen3: "croquetas-jamon3.jpg"
        },
        {
            nombre: "Alitas de pollo",
            precio_pvp: "8.50",
            precio_oferta: "6.99",
            descripcion: "Alitas de pollo marinadas y horneadas a la perfección, acompañadas de salsa barbacoa.",
            categoria_nombre: "Complementos",
            imagen1: "alitas-pollo1.jpg",
            imagen2: "alitas-pollo2.jpg",
            imagen3: "alitas-pollo3.jpg"
        },
        {
            nombre: "Patatas alioli",
            precio_pvp: "9.50",
            descripcion: "Patatas fritas caseras servidas con salsa alioli.",
            categoria_nombre: "Complementos",
            imagen1: "patatas-alioli1.jpg",
            imagen2: "patatas-alioli2.jpg",
            imagen3: "patatas-alioli3.jpg"
        },
        //6 Bebidas
        {
            nombre: "Agua mineral",
            precio_pvp: "1.5",
            descripcion: "Agua mineral natural embotellada.",
            categoria_nombre: "Bebidas",
            imagen1: "agua.jpg",
        },
        {
            nombre: "Agua con gas",
            precio_pvp: "1.5",
            descripcion: "Agua con gas natural en botella.",
            categoria_nombre: "Bebidas",
            imagen1: "agua-con-gas.jpg",
        },
        {
            nombre: "Refresco de naranja",
            precio_pvp: "2",
            descripcion: "Refresco de naranja con gas en lata.",
            categoria_nombre: "Bebidas",
            imagen1: "fanta-naranja.jpg",
        },
        {
            nombre: "Refresco de limón",
            precio_pvp: "2",
            descripcion: "Refresco de limón con gas en lata.",
            categoria_nombre: "Bebidas",
            imagen1: "fanta-limon.jpg",
        },
        {
            nombre: "Cerveza",
            precio_pvp: "2.5",
            precio_oferta: "1.49",
            descripcion: "Cerveza fría en botella de cristal.",
            categoria_nombre: "Bebidas",
            imagen1: "cerveza.jpg",
        },
        {
            nombre: "Té al limón",
            precio_pvp: "2.5",
            descripcion: "Té caliente con limón y azúcar.",
            categoria_nombre: "Bebidas",
            imagen1: "nestea.jpg",
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
