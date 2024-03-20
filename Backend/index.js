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
const port = process.env.PORT || 9800
const usuarioRoutes = require("./routes/usuario.routes")
//rutas productos
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

/*app.use(cookieParser("passwordforcookies"))
app.use(session({
    secret: "cookiePassword",
    resave: false,
    saveUninitialized: true,
    cookie: {
        //sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,
    }
}))*/

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
app.use(express.static(path.join(__dirname, "js")));


app.use(addMorganToLogger)

//Rutas
app.use(`/api/${version}/usuarios`,usuarioRoutes)
//rutas productos
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

app.get('/productos', (req, res) => {
    res.render('productos.ejs');
});

app.get('/productos/pizzas', (req, res) => {
    res.render('pizzas.ejs');
});

app.get('/productos/pastas', (req, res) => {
    res.render('pastas.ejs');
});

app.get('/productos/complementos', (req, res) => {
    res.render('complementos.ejs');
});

app.get('/productos/bebidas', (req, res) => {
    res.render('bebidas.ejs');
});

app.get('/carrito', (req, res) => {
    res.render('carrito.ejs');
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
























app.use(errorHandler)

//Levantar el server
app.listen(port,()=>{
    mongoConn.establecerConexion()
    console.log("http://localhost:9800")
    logger.access.debug(`http://localhost:9800`)
})