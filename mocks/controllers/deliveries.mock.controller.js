import DeliveryMockService from '../services/deliveries.mock.service.js';

class DeliveryMockController {
	static async generate(req, res, next) {
		try {
			const { deliveries } = req.body;
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
			const deliveriesInserted =
				await DeliveryMockService.generateAndInsert(deliveries);

			res.status(200).json(deliveriesInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default DeliveryMockController;
