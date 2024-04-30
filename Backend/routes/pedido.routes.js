const PedidoController = require("../controllers/pedidos.controller");
const express = require("express");
const router = express.Router();

//ADMIN-CRUD
router.get("/getAllOrder", PedidoController.obtenerTodosPedidos);
router.get("/getOrderDetailByID/:id", PedidoController.buscarPorId);
router.post("/saveOrder", PedidoController.crearPedido);
router.put("/editOrder/:id", PedidoController.actualizarPedido);
router.delete("/deleteOrderByID/:id", PedidoController.eliminarPedido);

//PEDIDOS por USUARIO
router.get("/mis-pedidos", PedidoController.obtenerPedidosPorUsuario);

//Empleado
router.get("/", PedidoController.obtenerTodosPedidos);
router.post("/desactivar/:id", PedidoController.desactivarPedido);

router.post("/cambiar-estado/:id", PedidoController.actualizarEstadoPedido);



module.exports = router