const Categoria = require("../models/categorias.model")
const mongoConn = require("../config/mongoDB.config")

const ejecutar = async()=>{
    await mongoConn.conectarMongoDB()
    .then(()=>{
        console.log("Conexión a MongoDB establecida...")
    })
    .catch((err)=>{
        console.log(err)
    })

    const categorias = [
        {   
            nombre:"Pizzas",
            subcategoria:"Alimentos"
        },
        {   
            nombre:"Pastas",
            subcategoria:"Alimentos"
        },
        {   
            nombre:"Complementos",
            subcategoria:"Alimentos"
        },
        {   
            nombre:"Bebidas",
            subcategoria:"Refrescos"
        },
    ]

    await Categoria.insertMany(categorias)
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