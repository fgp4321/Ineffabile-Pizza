const ProductoController = require("../controllers/productos.controller");
const express = require("express");
const router = express.Router();
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

router.get("/getAllProduct", ProductoController.obtenerTodosProductos);
router.get("/getProductDetailByID/:id", ProductoController.buscarPorId);
router.post("/saveProduct", rutasProtegidasJWT(['ADMIN']),ProductoController.crearProducto);
router.put("/editProduct/:id", rutasProtegidasJWT(['ADMIN']), ProductoController.actualizarProducto);
router.delete("/deleteProductByID/:id", rutasProtegidasJWT(['ADMIN']),ProductoController.eliminarProducto);

// Nueva ruta para manejar las búsquedas
/*
router.get("/resultados", async (req, res) => {
  const { query } = req.query;
  try {
    const { body } = await client.search({
      index: 'productos',
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['nombre', 'categoria_nombre']
          }
        }
      }
    });
    res.render('resultados', { productos: body.hits.hits });
  } catch (error) {
    console.error('Error al buscar en Elasticsearch:', error);
    res.status(500).send("Error al realizar la búsqueda");
  }
});*/

module.exports = router