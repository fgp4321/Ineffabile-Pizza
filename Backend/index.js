//Conexiones BBDD
const mongoConn = require("./config/mongoDB.config")

//Middlewares
require("dotenv").config()
const cors = require("cors")
const fs = require("fs")
const https = require("https")
const express = require("express")
const path = require("path")
const logger = require("./logger")
const morgan = require("morgan")
const errorHandler = require("./middlewares/errorHandler.mw")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const methodOverride = require('method-override');

const app = express()
const port = process.env.PORT || 9000
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
const whiteList = []

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
    secret: "cookiePassword",
    resave: false,
    saveUninitialized: true,
    cookie: {
        //sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000,
    }
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set("view_engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")))

app.use(addMorganToLogger)

//Rutas
app.use(`/api/${version}/usuarios`,usuarioRoutes)
//rutas productos
//rutas categorias
//rutas pedidos

app.use(errorHandler)

//Levantar el server
app.listen(port,()=>{
    mongoConn.establecerConexion()
    console.log("http://localhost:9000")
    logger.access.debug(`http://localhost:9000`)
})