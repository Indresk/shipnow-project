const DeliveriesRepository = require('../repositories/deliveries.repository');
const { getTrackingStatus } = require('../services/trackingProvider');
const OrdersService = require('./orders.service');
const CouriersService = require('./couriers.service');
const { DELIVERY_STATUS } = require('../constants');
const { default: mongoose } = require('mongoose');

class DeliveriesService {
	static async getAll() {
		const deliveries = await DeliveriesRepository.getAll();
		return deliveries;
	}
	static async getById(id) {
		const delivery = await DeliveriesRepository.getById(id);

		if (!delivery) {
			throw new Error('Delivery no encontrada');
		}

		const tracking = getTrackingStatus(delivery._id);
		return {
			delivery,
			tracking,
		};
	}
	static async create({ orderId, courierId, status }) {
		const currentDate = new Date();

		if (!orderId || !courierId) throw new Error('Faltan orderId o courierId');

		const order = await OrdersService.getById(orderId);
		if (!order) throw new Error('Order no encontrada');

		const courier = await CouriersService.getById(courierId);
		if (!courier) throw new Error('Courier no encontrado');

		const delivery = await DeliveriesRepository.create({
			orderId,
			courierId,
			status: status || DELIVERY_STATUS.ASSIGNED,
			assignedAt: currentDate,
		});

		return delivery;
	}
	static async update(id, status) {
		if (!status) throw new Error('Falta el status');
		if (!Object.values(DELIVERY_STATUS).includes(status)) {
			throw new Error('El status proporcionado no es valido');
		}
		if (!mongoose.isValidObjectId(id))
			throw new Error(`La ID proporcionada no es un ID válido.`);
		const delivery = await this.getById(id);

		if (!delivery) throw new Error('Delivery no encontrada');

		const deliveryUpdated = await DeliveriesRepository.update(id, status);
		return deliveryUpdated;
	}
}

module.exports = DeliveriesService;
