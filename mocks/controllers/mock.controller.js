import CourierMockService from '../services/couriers.mock.service.js';
import DeliveryMockService from '../services/deliveries.mock.service.js';
import OrderMockService from '../services/orders.mock.service.js';
import ProductMockService from '../services/products.mock.service.js';
import UserMockService from '../services/users.mock.service.js';

const generators = {
	users: UserMockService,
	products: ProductMockService,
	couriers: CourierMockService,
	orders: OrderMockService,
	deliveries: DeliveryMockService,
};

class MockController {
	static async generate(req, res) {
		try {
			const generatedEntries = await Promise.all(
				Object.entries(generators).map(async ([key, service]) => {
					const keyValue = req.body[key];
					if (keyValue == null) return null;

					const result = await service.generateMultiple(keyValue);
					return [key, result];
				}),
			);

			const generated = Object.fromEntries(
				generatedEntries.filter((key, value) => key != null),
			);

			res.status(200).json(generated);
			res.status(200);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
	static async insert(req, res) {
		try {
			const insertedEntries = await Promise.all(
				Object.entries(generators).map(async ([key, service]) => {
					const keyValue = req.body[key];
					if (keyValue == null) return null;

					const result = await service.generateAndInsert(keyValue);
					return [key, result];
				}),
			);

			const inserted = Object.fromEntries(
				insertedEntries.filter((key, value) => key != null),
			);

			res.status(200).json(inserted);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
}

export default MockController;
