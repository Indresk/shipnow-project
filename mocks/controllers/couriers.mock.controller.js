import CourierMockService from '../services/couriers.mock.service.js';

class CourierMockController {
	static async generate(req, res) {
		try {
			const { couriers } = req.body;
			const couriersGenerated =
				await CourierMockService.generateMultiple(couriers);

			res.status(200).json(couriersGenerated);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
	static async insert(req, res) {
		try {
			const { couriers } = req.body;
			const couriersInserted =
				await CourierMockService.generateAndInsert(couriers);

			res.status(200).json(couriersInserted);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
}

export default CourierMockController;
