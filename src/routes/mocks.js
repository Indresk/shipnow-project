import express from 'express';
import UserMockController from '../../mocks/controllers/users.mock.controller.js';
import OrderMockController from '../../mocks/controllers/orders.mock.controller.js';
import ProductMockController from '../../mocks/controllers/products.mock.controller.js';
import DeliveryMockController from '../../mocks/controllers/deliveries.mock.controller.js';
import CourierMockController from '../../mocks/controllers/couriers.mock.controller.js';
import MockController from '../../mocks/controllers/mock.controller.js';

const router = express.Router();

router.get('/mockingusers', UserMockController.generate);
router.get('/mockingproducts', ProductMockController.generate);
router.get('/mockingorders', OrderMockController.generate);
router.get('/mockingdeliveries', DeliveryMockController.generate);
router.get('/mockingcouriers', CourierMockController.generate);
router.get('/generateData', MockController.generate);
router.post('/generateData', MockController.insert);

export default router;
