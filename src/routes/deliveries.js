import express from 'express';
import DeliveriesController from '../controller/deliveries.controller.js';
import { uploadProof } from '../middlewares/uploads.middleware.js';

const router = express.Router();

// GET /api/deliveries -> lista entregas
router.get('/', DeliveriesController.getAll);

// GET /api/deliveries/:id -> obtiene una entrega por id (actua como tracking)
router.get('/:id', DeliveriesController.getById);

// POST /api/deliveries -> crea una entrega vinculando order + courier
router.post('/', DeliveriesController.create);

// PATCH /api/deliveries/:id/status -> actualiza el estado de una entrega
router.patch('/:id/status', DeliveriesController.update);

// POST /api/deliveries/:id/proofs
router.post('/:id/proofs', uploadProof, DeliveriesController.addDoc);

export default router;
