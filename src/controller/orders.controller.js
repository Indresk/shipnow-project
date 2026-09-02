import OrdersService from '../services/orders.service.js';
import sendNotification from '../services/notifications.js';
import logger from '../utils/logger.js';

class OrdersController {
	static async getAll(req, res, next) {
		try {
			const { limit, page } = req.query;
			const orders = await OrdersService.getPaginated({ limit, page });

			res.status(200).json(orders);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const selectedOrder = await OrdersService.getById(id);

			res.status(200).json(selectedOrder);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const {
				customerName,
				customer,
				address,
				weight,
				courierId,
				items,
				priority,
			} = req.body;

			const order = await OrdersService.create({
				customerName,
				customer,
				address,
				weight,
				courierId,
				items,
				priority,
			});

			sendNotification(
				'Nuevo envio creado para ' +
					customerName +
					' por $' +
					order.shippingCost,
			);

			logger.debug(`Order creada: ${order.orderId}`);
			res.status(201).json(order);
		} catch (error) {
			next(error);
		}
	}

	static async updateStatus(req, res, next) {
		try {
			const { id } = req.params;
			const { status } = req.body;
			const newOrderStatus = await OrdersService.updateStatus(status, id);

			logger.debug(
				`Order actualizada: ${newOrderStatus._id} -> ${newOrderStatus.status}`,
			);
			res.status(200).json(newOrderStatus);
		} catch (error) {
			next(error);
		}
	}
}

export default OrdersController;
