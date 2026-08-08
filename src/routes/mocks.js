import express from 'express';
import UserMockController from '../../mocks/controllers/users.mock.controller.js';
import OrderMockController from '../../mocks/controllers/orders.mock.controller.js';
import ProductMockController from '../../mocks/controllers/products.mock.controller.js';
import DeliveryMockController from '../../mocks/controllers/deliveries.mock.controller.js';
import CourierMockController from '../../mocks/controllers/couriers.mock.controller.js';
import MockController from '../../mocks/controllers/mock.controller.js';

const router = express.Router();

// Generar datos mock por modelo sin guardarlos en DB
router.get('/mockingusers', UserMockController.generate);
router.get('/mockingproducts', ProductMockController.generate);
router.get('/mockingorders', OrderMockController.generate);
router.get('/mockingdeliveries', DeliveryMockController.generate);
router.get('/mockingcouriers', CourierMockController.generate);

// Generar datos mock por modelo y guardarlos en DB
router.post('/mockingusers', UserMockController.insert);
router.post('/mockingproducts', ProductMockController.insert);
router.post('/mockingorders', OrderMockController.insert);
router.post('/mockingdeliveries', DeliveryMockController.insert);
router.post('/mockingcouriers', CourierMockController.insert);

// Generar datos mock para todos los modelos o segun body del request y guardarlos o no en DB segun http verb
router.get('/generateData', MockController.generate);
router.post('/generateData', MockController.insert);

export default router;
