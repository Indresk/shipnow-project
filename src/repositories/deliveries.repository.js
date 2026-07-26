const Delivery = require('../models/delivery');

class DeliveriesRepository {
	static async getAll() {
		const deliveries = await Delivery.find();
		return deliveries;
	}
	static async getById(id) {
		const delivery = await Delivery.findById(id);
		return delivery;
	}
	static async create({ orderId, courierId, status, assignedAt }) {
		const delivery = await Delivery.create({
			orderId,
			courierId,
			status,
			assignedAt,
		});
		return delivery;
	}
	static async update(id, newStatus) {
		const deliveryUpdated = await Delivery.findByIdAndUpdate(
			id,
			{ $set: { status: newStatus } },
			{ new: true, runValidators: true },
		);

		return deliveryUpdated;
	}
}

module.exports = DeliveriesRepository;
