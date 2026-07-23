const express = require('express');
const router = express.Router();

const OrdersController = require('../controller/orders.controller');

// POST /api/orders -> crea un envio
router.post('/', OrdersController.create);

// GET /api/orders -> lista todos los envios
router.get('/', OrdersController.getAll);

// GET /api/orders/:id -> obtiene un envio por id
router.get('/:id', OrdersController.getById);

// PATCH /api/orders/:id/status -> cambia el estado de un envio
router.patch('/:id/status', OrdersController.updateStatus);

module.exports = router;
