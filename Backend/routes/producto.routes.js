const ProductoController = require("../controllers/productos.controller");
const express = require("express");
const router = express.Router();
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const upload = require('../middlewares/multer');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para la administración de productos
 */

/* Administracion */
/**
 * @swagger
 * /api/v2/productos/getAllProduct:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       401:
 *         description: No autorizado
 */
router.get("/getAllProduct", ProductoController.obtenerTodosProductos);

/**
 * @swagger
 * /api/v2/productos/getProductDetailByID/{id}:
 *   get:
 *     summary: Obtener detalles de un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/getProductDetailByID/:id", ProductoController.buscarPorId);

/**
 * @swagger
 * /api/v2/productos/saveProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *               precio_pvp:
 *                 type: number
 *                 description: Precio PVP del producto
 *               precio_oferta:
 *                 type: number
 *                 description: Precio Oferta del producto
 *               categoria_nombre:
 *                 type: string
 *                 description: Categoria del producto
 *               imagen1:
 *                 type: string
 *                 description: Primera imagen del producto
 *               imagen2:
 *                 type: string
 *                 description: Segunda imagen del producto
 *               imagen3:
 *                 type: string
 *                 description: Tercera imagen del producto
 *     responses:
 *       200:
 *         description: Producto creado con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/saveProduct", upload.single('imagen1'), ProductoController.crearProducto);

/**
 * @swagger
 * /api/v2/productos/editProduct/{id}:
 *   put:
 *     summary: Actualizar información de un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *               precio_pvp:
 *                 type: number
 *                 description: Precio PVP del producto
 *               precio_oferta:
 *                 type: number
 *                 description: Precio Oferta del producto
 *               categoria_nombre:
 *                 type: string
 *                 description: Categoria del producto
 *               imagen1:
 *                 type: string
 *                 description: Primera imagen del producto
 *               imagen2:
 *                 type: string
 *                 description: Segunda imagen del producto
 *               imagen3:
 *                 type: string
 *                 description: Tercera imagen del producto
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.put("/editProduct/:id", upload.single('imagen1'), ProductoController.actualizarProducto); // Asegúrate de usar multer aquí

/**
 * @swagger
 * /api/v2/productos/deleteProductByID/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.delete("/deleteProductByID/:id", ProductoController.eliminarProducto);

router.get("/productos/:categoria", ProductoController.obtenerProductosPorCategoria);

/**
 * @swagger
 * /api/v2/productos/buscarProductos:
 *   get:
 *     summary: Buscar productos por nombre
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         description: Nombre del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Productos encontrados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *               precio_pvp:
 *                 type: number
 *                 description: Precio PVP del producto
 *               precio_oferta:
 *                 type: number
 *                 description: Precio Oferta del producto
 *               categoria_nombre:
 *                 type: string
 *                 description: Categoria del producto
 *               imagen1:
 *                 type: string
 *                 description: Primera imagen del producto
 *               imagen2:
 *                 type: string
 *                 description: Segunda imagen del producto
 *               imagen3:
 *                 type: string
 *                 description: Tercera imagen del producto
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Productos no encontrados
 *       500:
 *         description: Error interno del servidor
 */
router.get("/buscarProductos", ProductoController.buscarProductosPorNombre);

module.exports = router