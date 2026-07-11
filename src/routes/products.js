const express = require('express');
const router = express.Router();

const ProductsController = require('../controller/products.controller');

// CRUD basico de productos. Misma deuda tecnica que el resto:
// validacion manual + acceso directo a DB dentro de la ruta, sin service/repository.

// POST /api/products -> crea un producto
router.post('/', ProductsController.create);

// GET /api/products -> lista productos
router.get('/', ProductsController.getAll);

// GET /api/products/:id -> obtiene un producto por id
router.get('/:id', ProductsController.getById);

module.exports = router;
