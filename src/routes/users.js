import express from 'express';
import UserController from '../controller/user.controller.js';

const router = express.Router();

// GET /api/users -> lista clientes
router.get('/', UserController.getAll);

// GET /api/users/:id -> obtiene un cliente por id
router.get('/:id', UserController.getById);

// POST /api/users -> crea un cliente
router.post('/', UserController.create);

export default router;
