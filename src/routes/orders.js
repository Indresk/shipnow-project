import express from 'express';
import OrdersController from '../controller/orders.controller.js';

const router = express.Router();

// GET /api/orders -> lista todos los envios
router.get('/', OrdersController.getAll);

// GET /api/orders/:id -> obtiene un envio por id
router.get('/:id', OrdersController.getById);

// POST /api/orders -> crea un envio
router.post('/', OrdersController.create);

// PATCH /api/orders/:id/status -> cambia el estado de un envio
router.patch('/:id/status', OrdersController.updateStatus);

export default router;
