import Courier from '../models/courier.js';

class CouriersRepository {
	static async getAll() {
		const couriers = await Courier.find();
		return couriers;
	}

	static async getById(id) {
		const courier = await Courier.findById(id);
		return courier;
	}

	static async create({ name, zone, available }) {
		const courier = await Courier.create({ name, zone, available });
		return courier;
	}

	static async insertMany(couriers) {
		const newCouriers = await Courier.insertMany(couriers);
		return newCouriers;
	}
}

export default CouriersRepository;
