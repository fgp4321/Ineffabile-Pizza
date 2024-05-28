const PedidoController = require("../controllers/pedidos.controller");
const express = require("express");
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const router = express.Router();
const path = require('path');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para la administración de pedidos
 */


/* Administracion */
/**
 * @swagger
 * /pedidos/getAllOrder:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida con éxito
 *       401:
 *         description: No autorizado
 */
router.get("/getAllOrder", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.obtenerTodosPedidos);


/**
 * @swagger
 * /pedidos/getOrderDetailByID/{id}:
 *   get:
 *     summary: Obtener detalles de un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del pedido obtenidos con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido no encontrado
 */
router.get("/getOrderDetailByID/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.buscarPorId);

/**
 * @swagger
 * /pedidos/saveOrder:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               productos:
 *                 type: array
 *                 description: Productos comprados
 *               fecha:
 *                 type: string
 *                 description: Fecha pedido efectuado
 *               total:
 *                 type: string
 *                 description: Precio total del pedido
 *               estadoPedido_status:
 *                 type: string
 *                 description: Estado del pedido (por ejemplo, 'Pendiente', 'Preparado', 'Listo', etc.)
 *               isActive:
 *                 type: boolean
 *                 description: Booleano para saber si el pedido esta activo o ha finalizado
 *     responses:
 *       200:
 *         description: Pedido creado con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/saveOrder", PedidoController.crearPedido);

/**
 * @swagger
 * /pedidos/editOrder/{id}:
 *   put:
 *     summary: Actualizar información de un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               productos:
 *                 type: array
 *                 description: Productos comprados
 *               fecha:
 *                 type: string
 *                 description: Fecha pedido efectuado
 *               total:
 *                 type: string
 *                 description: Precio total del pedido
 *               estadoPedido_status:
 *                 type: string
 *                 description: Estado del pedido (por ejemplo, 'Pendiente', 'Preparado', 'Listo', etc.)
 *               isActive:
 *                 type: boolean
 *                 description: Booleano para saber si el pedido esta activo o ha finalizado
 *     responses:
 *       200:
 *         description: Pedido actualizado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.put("/editOrder/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.actualizarPedido);

/**
 * @swagger
 * /pedidos/deleteOrderByID/{id}:
 *   delete:
 *     summary: Eliminar un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido eliminado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.delete("/deleteOrderByID/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.eliminarPedido);

//PEDIDOS por USUARIO
router.get("/mis-pedidos", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE', 'USER']), PedidoController.obtenerPedidosPorUsuario);

//Empleado
router.get("/", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.obtenerTodosPedidos);
router.post("/desactivar/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.desactivarPedido);

router.post("/cambiar-estado/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.actualizarEstadoPedido);

module.exports = router