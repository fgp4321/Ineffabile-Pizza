const ProductoController = require("../controllers/productos.controller");
const express = require("express");
const router = express.Router();
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const upload = require('../middlewares/multer');

router.get("/getAllProduct", ProductoController.obtenerTodosProductos);
router.get("/getProductDetailByID/:id", ProductoController.buscarPorId);
router.post("/saveProduct", upload.single('imagen1'), ProductoController.crearProducto);
router.put("/editProduct/:id", upload.single('imagen1'), ProductoController.actualizarProducto); // Asegúrate de usar multer aquí
router.delete("/deleteProductByID/:id", ProductoController.eliminarProducto);

router.get("/productos/:categoria", ProductoController.obtenerProductosPorCategoria);

// Añadir ruta para buscar productos
router.get("/buscarProductos", ProductoController.buscarProductosPorNombre);

module.exports = router