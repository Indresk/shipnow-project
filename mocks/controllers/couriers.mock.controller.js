import CourierMockService from '../services/couriers.mock.service.js';

class CourierMockController {
	static async generate(req, res, next) {
		try {
			const { couriers } = req.body;
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
			const couriersInserted =
				await CourierMockService.generateAndInsert(couriers);

			res.status(200).json(couriersInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default CourierMockController;
