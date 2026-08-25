import logger from '../../../src/utils/logger.js';
import CourierMockService from '../services/couriers.mock.service.js';

class CourierMockController {
	static async generate(req, res, next) {
		try {
			const { couriers } = req.query;
			logger.debug(`Se solicitaron generar ${couriers} mock couriers`);
			const couriersGenerated =
				await CourierMockService.generateMultiple(couriers);

			res.status(200).json(couriersGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { couriers } = req.body;
			logger.debug(`Se solicitaron insertar en db ${couriers} mock couriers`);
			const couriersInserted =
				await CourierMockService.generateAndInsert(couriers);

			res.status(201).json(couriersInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default CourierMockController;
