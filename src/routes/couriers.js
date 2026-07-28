import express from 'express';
import CourierController from '../controller/couriers.controller.js';

const router = express.Router();

// CRUD basico de repartidores. Misma deuda tecnica que el resto:
// validacion + acceso a DB dentro de la ruta, sin service/repository.

// GET /api/couriers -> lista repartidores
router.get('/', CourierController.getAll);

// GET /api/couriers/:id -> obtiene un repartidor por id
router.get('/:id', CourierController.getById);

// POST /api/couriers -> crea un repartidor
router.post('/', CourierController.create);

export default router;
