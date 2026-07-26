const Courier = require('../models/courier');

class CouriersRepository {
	static async getAll() {
		const deliveries = await Courier.find();
		return deliveries;
	}
	static async getById(id) {
		const delivery = await Courier.findById(id);
		return delivery;
	}
	static async create({ name, zone, available }) {
		const delivery = await Courier.create({ name, zone, available });
		return delivery;
	}
}

module.exports = CouriersRepository;
