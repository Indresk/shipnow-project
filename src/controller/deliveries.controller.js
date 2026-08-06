import DeliveriesService from '../services/deliveries.service.js';

class DeliveriesController {
	static async getAll(req, res, next) {
		try {
			const deliveries = await DeliveriesService.getAll();
			res.json(deliveries);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const deliveryStatus = await DeliveriesService.getById(req.params.id);
			res.json(deliveryStatus);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const { orderId, courierId, status } = req.body;
			const delivery = await DeliveriesService.create({
				orderId,
				courierId,
				status,
			});

			console.log('Delivery creada:', delivery._id);
			res.status(201).json(delivery);
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		try {
			const { status } = req.body;
			const { id } = req.params;

			const delivery = await DeliveriesService.update(id, status);
			console.log('Delivery actualizada:', delivery._id, '->', status);
			res.json(delivery);
		} catch (error) {
			next(error);
		}
	}
}

export default DeliveriesController;
