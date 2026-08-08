import logger from '../../src/utils/logger.js';
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
	static async generate(req, res, next) {
		try {
			const generatedEntries = await Promise.all(
				Object.entries(generators).map(async ([key, service]) => {
					const keyValue = req.body[key];
					if (keyValue == null) return null;

					logger.debug(`Se solicitaron generar ${keyValue} mock ${key}`);
					const result = await service.generateMultiple(keyValue);
					return [key, result];
				}),
			);

			const generated = Object.fromEntries(
				generatedEntries.filter((key, value) => key != null),
			);

			logger.http('GET /api/mocks/generateData 200');
			res.status(200).json(generated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const inserted = {};

			for (const [key, service] of Object.entries(generators)) {
				const keyValue = req.body[key];

				if (keyValue == null) continue;

				logger.debug(
					`Se solicitaron insertar en la db ${keyValue} mock ${key}`,
				);
				inserted[key] = await service.generateAndInsert(keyValue);
			}

			logger.http('POST /api/mocks/generateData 201');
			res.status(201).json(inserted);
		} catch (error) {
			next(error);
		}
	}
}

export default MockController;
