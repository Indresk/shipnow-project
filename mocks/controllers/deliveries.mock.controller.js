import DeliveryMockService from '../services/deliveries.mock.service.js';

class DeliveryMockController {
	static async generate(req, res) {
		try {
			const { deliveries } = req.body;
			const deliveriesGenerated =
				await DeliveryMockService.generateMultiple(deliveries);

			res.status(200).json(deliveriesGenerated);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
	static async insert(req, res) {
		try {
			const { deliveries } = req.body;
			const deliveriesInserted =
				await DeliveryMockService.generateAndInsert(deliveries);

			res.status(200).json(deliveriesInserted);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
}

export default DeliveryMockController;
