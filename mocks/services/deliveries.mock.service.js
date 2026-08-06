import { faker } from '@faker-js/faker';
import OrdersRepository from '../../src/repositories/orders.repository.js';
import DeliveriesRepository from '../../src/repositories/deliveries.repository.js';
import { DELIVERY_STATUS } from '../../src/constants/index.js';
import AppError from '../../src/errors/app.error.js';
import { ERROR_CODES } from '../../src/errors/error.codes.js';

class DeliveryMockService {
	static generate({ availableOrders }) {
		const selectedOrder = faker.helpers.arrayElement(availableOrders);

		const fakeDelivery = {
			orderId: selectedOrder.id,
			courierId: selectedOrder.courierId,
			status: faker.helpers.objectValue(DELIVERY_STATUS),
			assignedAt: faker.date.past({ years: { max: 1, min: 0 } }),
		};

		return fakeDelivery;
	}

	static async generateMultiple(amount = 1) {
		const availableOrders = await OrdersRepository.getAll();

		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new AppError(ERROR_CODES.INVALID_MOCK_AMOUNT);

		if (availableOrders.length === 0)
			throw new AppError(
				ERROR_CODES.MOCK_GENERATION_ERROR,
				'Actualmente no hay suficientes orders en la DB para crear este mock',
			);

		const fakeDeliveries = Array.from({ length: amount }, () =>
			this.generate({ availableOrders }),
		);

		return fakeDeliveries;
	}

	static async insert(fakeArray) {
		const deliveries = await DeliveriesRepository.insertMany(fakeArray);
		return deliveries;
	}

	static async generateAndInsert(amount) {
		const generated = await this.generateMultiple(amount);
		const inserted = await this.insert(generated);

		return inserted;
	}
}

export default DeliveryMockService;
