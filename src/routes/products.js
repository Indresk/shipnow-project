import express from 'express';
import ProductsController from '../controller/products.controller.js';

const router = express.Router();

// GET /api/products -> lista productos
router.get('/', ProductsController.getAll);

// GET /api/products/:id -> obtiene un producto por id
router.get('/:id', ProductsController.getById);

// POST /api/products -> crea un producto
router.post('/', ProductsController.create);

export default router;
