import CouriersService from '../services/couriers.service.js';
import logger from '../utils/logger.js';

class CourierController {
	static async getAll(req, res, next) {
		try {
			const couriers = await CouriersService.getAll();

			logger.http('GET /api/couriers 200');
			res.status(200).json(couriers);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const courier = await CouriersService.getById(id);

			logger.http(`GET /api/couriers/${id} 200`);
			res.status(200).json(courier);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const { name, zone, available } = req.body;
			const courier = await CouriersService.create({
				name,
				zone,
				available,
			});

			logger.debug(`Courier creado: ${courier._id}`);
			logger.http(`POST /api/couriers 201`);
			res.status(201).json(courier);
		} catch (error) {
			next(error);
		}
	}
}

export default CourierController;
