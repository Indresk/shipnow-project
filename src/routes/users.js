import express from 'express';
import UserController from '../controller/user.controller.js';
import { uploadDoc } from '../middlewares/uploads.middleware.js';

const router = express.Router();

// GET /api/users -> lista clientes
router.get('/', UserController.getAll);

// GET /api/users/:id -> obtiene un cliente por id
router.get('/:id', UserController.getById);

// POST /api/users -> crea un cliente
router.post('/', UserController.create);

// POST /api/users/:id/documents
router.post('/:id/documents', uploadDoc, UserController.addDoc);

export default router;
