import logger from '../../../src/utils/logger.js';
import DeliveryMockService from '../services/deliveries.mock.service.js';

class DeliveryMockController {
	static async generate(req, res, next) {
		try {
			const { deliveries } = req.query;
			logger.debug(`Se solicitaron generar ${deliveries} mock deliveries`);
			const deliveriesGenerated =
				await DeliveryMockService.generateMultiple(deliveries);

			res.status(200).json(deliveriesGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { deliveries } = req.body;
			logger.debug(
				`Se solicitaron insertar en db ${deliveries} mock deliveries`,
			);
			const deliveriesInserted =
				await DeliveryMockService.generateAndInsert(deliveries);

			res.status(201).json(deliveriesInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default DeliveryMockController;
