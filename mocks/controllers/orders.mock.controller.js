import OrderMockService from '../services/orders.mock.service.js';

class OrderMockController {
	static async generate(req, res) {
		try {
			const { orders } = req.body;
			const ordersGenerated = await OrderMockService.generateMultiple(orders);

			res.status(200).json(ordersGenerated);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
	static async insert(req, res) {
		try {
			const { orders } = req.body;
			const ordersInserted = await OrderMockService.generateAndInsert(orders);

			res.status(200).json(ordersInserted);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
}

export default OrderMockController;
