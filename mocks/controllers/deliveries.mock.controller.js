import logger from '../../src/utils/logger.js';
import DeliveryMockService from '../services/deliveries.mock.service.js';

class DeliveryMockController {
	static async generate(req, res, next) {
		try {
			const { deliveries } = req.body;
			logger.debug(`Se solicitaron generar ${deliveries} mock deliveries`);
			const deliveriesGenerated =
				await DeliveryMockService.generateMultiple(deliveries);

			logger.http('GET /api/mocks/mockingdeliveries 200');
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

			logger.http('POST /api/mocks/mockingdeliveries 201');
			res.status(201).json(deliveriesInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default DeliveryMockController;
