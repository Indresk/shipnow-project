const OrdersService = require('../services/orders.service');
const sendNotification = require('../services/notifications');

class OrdersController {
	static async create(req, res) {
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
			console.log('Error al crear order:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getAll(req, res) {
		try {
			const orders = await OrdersService.getAll();
			res.json(orders);
		} catch (error) {
			console.log('Error al listar orders:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getById(req, res) {
		try {
			const { id } = req.params;
			const selectedOrder = await OrdersService.getById(id);

			res.json(selectedOrder);
		} catch (error) {
			console.log('Error al buscar orden:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async updateStatus(req, res) {
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
			console.log('Error al actualizar order:', error.message);
			res.status(500).send('Error del servidor');
		}
	}
}

module.exports = OrdersController;
