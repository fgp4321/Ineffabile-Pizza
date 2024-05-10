const PedidoController = require("../controllers/pedidos.controller");
const express = require("express");
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const router = express.Router();
const path = require('path');

//ADMIN-CRUD
router.get("/getAllOrder", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.obtenerTodosPedidos);
router.get("/getOrderDetailByID/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.buscarPorId);
router.post("/saveOrder", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.crearPedido);
router.put("/editOrder/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.actualizarPedido);
router.delete("/deleteOrderByID/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.eliminarPedido);

//PEDIDOS por USUARIO
router.get("/mis-pedidos", PedidoController.obtenerPedidosPorUsuario);

//Empleado
router.get("/", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.obtenerTodosPedidos);
router.post("/desactivar/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.desactivarPedido);

router.post("/cambiar-estado/:id", rutasProtegidasJWT(['ADMIN', 'EMPLOYEE']),PedidoController.actualizarEstadoPedido);

module.exports = router