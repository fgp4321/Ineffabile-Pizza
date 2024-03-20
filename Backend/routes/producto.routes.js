const ProductoController = require("../controllers/productos.controller");
const express = require("express");
const router = express.Router();

router.get("/getAllProduct", ProductoController.obtenerTodosProductos);
router.get("/getProductDetailByID/:id", ProductoController.buscarPorId);
router.post("/saveProduct", ProductoController.crearProducto);
router.put("/editProduct/:id", ProductoController.actualizarProducto);
router.delete("/deleteProductByID/:id", ProductoController.eliminarProducto);


module.exports = router