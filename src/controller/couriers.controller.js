import CouriersService from '../services/couriers.service.js';

class CourierController {
	static async getAll(req, res, next) {
		try {
			const couriers = await CouriersService.getAll();
			res.json(couriers);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const courier = await CouriersService.getById(req.params.id);
			res.json(courier);
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

			console.log('Courier creado:', courier._id);
			res.status(201).json(courier);
		} catch (error) {
			next(error);
		}
	}
}

export default CourierController;
