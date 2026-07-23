const Order = require('../models/order');

class OrdersRepository {
	static async create({
		customerName,
		customer,
		address,
		weight,
		cost,
		status,
		priority,
		items,
		courierId,
	}) {
		const newOrder = await Order.create({
			customerName,
			customer,
			address,
			weight,
			cost,
			status,
			priority,
			items,
			courierId,
		});

		return newOrder;
	}

	static async getAll() {
		const allOrders = await Order.find();
		return allOrders;
	}

	static async getById(id) {
		const selectedOrder = await Order.findById(id);
		return selectedOrder;
	}

	static async updateStatus(newStatus, id) {
		const orderUpdated = await Order.findByIdAndUpdate(
			id,
			{ $set: { status: newStatus } },
			{ new: true, runValidators: true },
		);

		return orderUpdated;
	}
}

module.exports = OrdersRepository;
