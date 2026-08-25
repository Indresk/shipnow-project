import CouriersService from '../services/couriers.service.js';

class CourierController {
	static async getAll(req, res, next) {
		try {
			const couriers = await CouriersService.getAll();

			res.status(200).json(couriers);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const courier = await CouriersService.getById(id);

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
			res.status(201).json(courier);
		} catch (error) {
			next(error);
		}
	}
}

export default CourierController;
