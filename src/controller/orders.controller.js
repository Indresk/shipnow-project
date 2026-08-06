import OrdersService from '../services/orders.service.js';
import sendNotification from '../services/notifications.js';

class OrdersController {
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

			console.log('Order creada:', order.orderId);
			res.status(201).json(order);
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const orders = await OrdersService.getAll();
			res.json(orders);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const selectedOrder = await OrdersService.getById(id);

			res.json(selectedOrder);
		} catch (error) {
			next(error);
		}
	}

	static async updateStatus(req, res, next) {
		try {
			const { id } = req.params;
			const { status } = req.body;
			const newOrderStatus = await OrdersService.updateStatus(status, id);

			console.log(
				'Order actualizada:',
				newOrderStatus._id.toString(),
				'->',
				newOrderStatus.status,
			);
			res.json(newOrderStatus);
		} catch (error) {
			next(error);
		}
	}
}

export default OrdersController;
