import Delivery from '../models/delivery.js';

class DeliveriesRepository {
	static async getAll() {
		const deliveries = await Delivery.find();
		return deliveries;
	}

	static async getPaginated({ limit, page }) {
		const deliveries = await Delivery.paginate({}, { limit, page, lean: true });
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

	static async insertMany(deliveries) {
		const newDeliveries = await Delivery.insertMany(deliveries);
		return newDeliveries;
	}

	static async addDoc(id, fileInfo) {
		const deliveryUpdated = await Delivery.findByIdAndUpdate(
			id,
			{
				$push: {
					proofs: fileInfo,
				},
			},
			{ new: true },
		).lean();
		return deliveryUpdated;
	}
}

export default DeliveriesRepository;
