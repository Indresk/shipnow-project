import express from 'express';
import ProductsController from '../controller/products.controller.js';

const router = express.Router();

// POST /api/products -> crea un producto
router.post('/', ProductsController.create);

// GET /api/products -> lista productos
router.get('/', ProductsController.getAll);

// GET /api/products/:id -> obtiene un producto por id
router.get('/:id', ProductsController.getById);

export default router;
