const ProductoController = require("../controllers/productos.controller");
const express = require("express");
const router = express.Router();

router.get("/getAllProduct", ProductoController.obtenerTodosProductos);
router.get("/getProductDetailByID/:id", ProductoController.buscarPorId);
router.post("/saveProduct", ProductoController.crearProducto);
router.put("/editProduct/:id", ProductoController.actualizarProducto);
router.delete("/deleteProductByID/:id", ProductoController.eliminarProducto);

// Ruta para buscar productos por nombre
router.post('/buscar', ProductoController.buscarProductosQuery);

// Renderizar la vista resultados.ejs con los resultados de búsqueda
router.get('/resultados', (req, res) => {
  const query = req.query.query;
  res.render('resultados.ejs', { query: query });
});

module.exports = router