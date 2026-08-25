import DeliveriesService from '../services/deliveries.service.js';
import logger from '../utils/logger.js';

class DeliveriesController {
	static async getAll(req, res, next) {
		try {
			const deliveries = await DeliveriesService.getAll();

			res.status(200).json(deliveries);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const deliveryStatus = await DeliveriesService.getById(id);

			res.status(200).json(deliveryStatus);
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

			logger.debug(`Delivery creada: ${delivery._id}`);
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

			logger.debug(`Delivery actualizada: ${delivery._id} -> ${status}`);
			res.status(200).json(delivery);
		} catch (error) {
			next(error);
		}
	}
}

export default DeliveriesController;
