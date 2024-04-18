//Conexiones BBDD
const mongoConn = require("./config/mongoDB.config")

//Middlewares
require("dotenv").config()
const cors = require("cors")
const fs = require("fs")
const https = require("https")
const express = require("express")
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require("path")
const logger = require("./logger")
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler.mw")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const methodOverride = require('method-override');

const app = express()
const port = process.env.PORT || 9100
const usuarioRoutes = require("./routes/usuario.routes")
const productoRoutes = require("./routes/producto.routes")
//rutas categorias
//rutas pedidos
const version = "v2"

app.use(methodOverride('_method'));

//LOGS
const addMorganToLogger = morgan("combined", {    
    stream: app.get("env") == "development"?fs.createWriteStream("./logs/access.log", {flags:"a"}):''
})

//Rutas permitidas para CORS
const whiteList = ["http://localhost:4200"]

const corsOptions = {
    origin: (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1) {
            callback(null,true)
        }else{
            callback(null,false)
        }
    },
    credentials: true
}
app.use(cors(corsOptions))

app.use(cookieParser("passwordforcookies"))
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const faviconPath = path.join(__dirname, 'public/favicon', 'favicon3.ico');
app.use(favicon(faviconPath));

app.set("view_engine","ejs")
app.set("views",path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname,"public")))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


app.use(addMorganToLogger)

//Rutas
app.use(`/api/${version}/usuarios`,usuarioRoutes)
app.use(`/api/${version}/productos`,productoRoutes)
//rutas categorias
//rutas pedidos

//RUTA HOME.EJS
app.get('/', (req, res) => {
    res.render('home.ejs')
})


//NEWSLETTER
// Ruta para manejar la suscripción al newsletter desde el formulario del footer
app.post('/subscribe', bodyParser.urlencoded({ extended: true }), (req, res) => {
    const { email } = req.body;
  
    // Validar el formato del correo electrónico (puedes usar una librería como validator.js)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Mostrar una alerta con SweetAlert2 indicando que el correo electrónico es inválido
      res.send('<script>alert("Por favor, introduce un correo electrónico válido."); window.location="/";</script>');
    }
  
    // Mostrar una alerta con SweetAlert2 indicando la suscripción exitosa y redirigir a /newsletter/success
    res.send('<script>alert("Te has suscrito satisfactoriamente al newsletter."); window.location="/newsletter/success";</script>')
    res.redirect('/newsletter/success');
});
  
  // Ruta para la página /newsletter
app.get('/newsletter/success', (req, res) => {
    res.render('newsletter-success.ejs');
});




app.get('/contacto', (req, res) => {
    res.render('contacto.ejs', { error: req.query.error });
});

// Ruta para manejar el envío del formulario de contacto
app.post('/contacto', bodyParser.urlencoded({ extended: true }), (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Valida los campos del formulario
    if (!nombre || !email || !mensaje) {
        // Si algún campo está vacío, redirige a la página de contacto con un mensaje de error
        res.redirect('/contacto?error=empty-fields');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Si el formato del correo electrónico es incorrecto, redirige a la página de contacto con un mensaje de error
        res.redirect('/contacto?error=invalid-email');
    } else {
        // Puedes agregar aquí el código para guardar el mensaje en la base de datos o enviar notificaciones, etc.

        // Redirige a la página de éxito
        res.redirect('/contacto/success');
    }
});

// Ruta para la página de éxito después de enviar el formulario de contacto
app.get('/contacto/success', (req, res) => {
    res.render('contacto-success.ejs');
});

app.get('/valoraciones', (req, res) => {
    res.render('valoraciones.ejs');
});

// Ruta para manejar el envío del formulario de valoraciones
app.post('/valoraciones', bodyParser.urlencoded({ extended: true }), (req, res) => {
    const { stars, message } = req.body;

    // Puedes agregar aquí el código para almacenar la valoración en la base de datos o realizar otras acciones

    // Redirige a la página de éxito
    res.redirect('/valoraciones/success');
});

// Ruta para la página de éxito después de enviar la valoración
app.get('/valoraciones/success', (req, res) => {
    res.render('valoraciones-success.ejs');
});

app.get('/mapa', (req, res) => {
    res.render('map.ejs');
});

app.get('/about-us', (req, res) => {
    res.render('about-us.ejs');
});

app.get('/envio', (req, res) => {
    res.render('envio.ejs');
});

app.get('/como-comprar', (req, res) => {
    res.render('como-comprar.ejs');
});

app.get('/alergenos', (req, res) => {
    res.render('alergenos.ejs');
});

app.get('/productos', (req, res) => {
    res.render('productos.ejs');
});

// Para la vista de pizzas
app.get('/productos/pizzas', async (req, res) => {
    try {
        // Hacer una solicitud al endpoint de productos para obtener las pizzas
        const response = await fetch('http://localhost:9100/api/v2/productos/getAllProduct');
        const productos = await response.json();
        // Filtrar las pizzas
        const pizzas = productos.filter(producto => producto.categoria_nombre === 'Pizzas');
        // Renderizar la vista de pizzas y pasar los datos de las pizzas
        res.render('pizzas.ejs', { pizzas });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las pizzas:', error);
        res.render('error.ejs', { message: 'Error al obtener las pizzas' });
    }
});

// Para la vista de pastas
app.get('/productos/pastas', async (req, res) => {
    try {
        // Hacer una solicitud al endpoint de productos para obtener todas las pastas
        const response = await fetch('http://localhost:9100/api/v2/productos/getAllProduct');
        const productos = await response.json();
        // Filtrar las pastas
        const pastas = productos.filter(producto => producto.categoria_nombre === 'Pastas');
        // Renderizar la vista de pastas y pasar los datos de las pastas
        res.render('pastas.ejs', { pastas });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las pastas:', error);
        res.render('error.ejs', { message: 'Error al obtener las pastas' });
    }
});

// Para la vista de complementos
app.get('/productos/complementos', async (req, res) => {
    try {
        // Hacer una solicitud al endpoint de productos para obtener todos los complementos
        const response = await fetch('http://localhost:9100/api/v2/productos/getAllProduct');
        const productos = await response.json();
        // Filtrar los complementos
        const complementos = productos.filter(producto => producto.categoria_nombre === 'Complementos');
        // Renderizar la vista de complementos y pasar los datos de los complementos
        res.render('complementos.ejs', { complementos });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener los complementos:', error);
        res.render('error.ejs', { message: 'Error al obtener los complementos' });
    }
});

// Para la vista de bebidas
app.get('/productos/bebidas', async (req, res) => {
    try {
        // Hacer una solicitud al endpoint de productos para obtener todas las bebidas
        const response = await fetch('http://localhost:9100/api/v2/productos/getAllProduct');
        const productos = await response.json();
        // Filtrar las bebidas
        const bebidas = productos.filter(producto => producto.categoria_nombre === 'Bebidas');
        // Renderizar la vista de bebidas y pasar los datos de las bebidas
        res.render('bebidas.ejs', { bebidas });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las bebidas:', error);
        res.render('error.ejs', { message: 'Error al obtener las bebidas' });
    }
});

app.get('/promociones', async (req, res) => {
    try {
        // Hacer una solicitud al endpoint de productos para obtener todas las promociones
        const response = await fetch('http://localhost:9100/api/v2/productos/getAllProduct');
        const productos = await response.json();
        // Filtrar las promociones
        const pizzas = productos.filter(producto => producto.categoria_nombre === 'Pizzas');
        const pastas = productos.filter(producto => producto.categoria_nombre === 'Pastas');
        const complementos = productos.filter(producto => producto.categoria_nombre === 'Complementos');
        const bebidas = productos.filter(producto => producto.categoria_nombre === 'Bebidas');
        // Renderizar la vista de promociones y pasar los datos de las promociones
        res.render('promociones.ejs', { pizzas, pastas, complementos, bebidas });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las promociones:', error);
        res.render('error.ejs', { message: 'Error al obtener las promociones' });
    }
});

// Ruta para agregar productos al carrito
app.post('/add-to-cart', (req, res) => {
    const { id, name, price, quantity } = req.body;
    
    // Obtén el carrito de la sesión
    let cart = req.session.cart || [];
    
    // Agrega el nuevo producto al carrito
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: quantity
    });
  
    // Guarda el carrito en la sesión
    req.session.cart = cart;
    
    // Devuelve una respuesta exitosa
    res.status(200).send('Producto agregado al carrito');
  });

  app.post('/eliminar-producto', (req, res) => {
    const productId = req.body.id;
    // Elimina el producto del carrito (implementa la lógica según tu aplicación)
    // Por ejemplo:
    req.session.cart = req.session.cart.filter(item => item.id !== productId);
    // Retorna una respuesta adecuada, como un código de estado 200 para indicar éxito
    res.sendStatus(200);
  });
  
  // Ruta para mostrar el carrito
  app.get('/carrito', (req, res) => {
    // Obtén el carrito de la sesión
    const cart = req.session.cart || [];
    
    // Agrupa los productos del carrito por su ID y calcula la cantidad total de cada producto
    const groupedCart = cart.reduce((acc, product) => {
        if (!acc[product.id]) {
            acc[product.id] = { ...product, quantity: 0 };
        }
        acc[product.id].quantity += 1;
        return acc;
    }, {});

    // Convierte el objeto agrupado en un array para pasarlo a la vista
    const cartItems = Object.values(groupedCart);
    
    // Renderiza la vista del carrito y pasa los productos del carrito
    res.render('carrito.ejs', { cart: cartItems });
});


app.get('/carta', (req, res) => {
    const pdfPath = path.join(__dirname, 'public', 'images', 'INEFFABILE-pizza-menu.pdf');
    if (fs.existsSync(pdfPath)) {
      res.sendFile(pdfPath);
    } else {
      res.status(404).send('PDF no encontrado');
    }
})

app.get('/condiciones-generales', (req, res) => {
    res.render('condiciones-generales.ejs');
});

app.get('/usuarios/login-register', (req, res) => {
    res.render('login-register.ejs');
});

app.get('/usuarios/personal-area', (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.userLogued) {
            res.redirect('/usuarios/login-register');
            return;
        }

        // Renderizar la vista personal-area y pasar la variable userLogued
        res.render('personal-area.ejs', { userLogued: req.session.userLogued });
    } catch (error) {
        res.status(500).json({ "err": "Error interno del servidor" });
    }
});

app.get('/checkout', (req, res) => {
    res.render('checkout.ejs');
});






















app.use(errorHandler)

//Levantar el server
app.listen(port,()=>{
    mongoConn.establecerConexion()
    console.log("http://localhost:9100")
    logger.access.debug(`http://localhost:9100`)
})