import logger from '../../../src/utils/logger.js';
import OrderMockService from '../services/orders.mock.service.js';

class OrderMockController {
	static async generate(req, res, next) {
		try {
			const { orders } = req.query;
			logger.debug(`Se solicitaron generar ${orders} mock orders`);
			const ordersGenerated = await OrderMockService.generateMultiple(orders);

			res.status(200).json(ordersGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { orders } = req.body;
			logger.debug(`Se solicitaron insertar en db ${orders} mock orders`);
			const ordersInserted = await OrderMockService.generateAndInsert(orders);

			res.status(201).json(ordersInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default OrderMockController;
