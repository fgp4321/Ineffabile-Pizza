const PedidoController = require("../controllers/pedidos.controller");
const express = require("express");
const router = express.Router();

router.get("/getAllOrder", PedidoController.obtenerTodosPedidos);
router.get("/getOrderDetailByID/:id", PedidoController.buscarPorId);
router.post("/saveOrder", PedidoController.crearPedido);
router.put("/editOrder/:id", PedidoController.actualizarPedido);
router.delete("/deleteOrderByID/:id", PedidoController.eliminarPedido);

router.get("/mis-pedidos", PedidoController.obtenerPedidosPorUsuario);

module.exports = router