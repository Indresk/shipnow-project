import { faker } from '@faker-js/faker';
import OrdersRepository from '../../src/repositories/orders.repository.js';
import UserRepository from '../../src/repositories/users.repository.js';
import { ORDER_PRIORITY, ORDER_STATUS } from '../../src/constants/index.js';
import ProductsRepository from '../../src/repositories/products.repository.js';
import CouriersRepository from '../../src/repositories/couriers.repository.js';
import AppError from '../../src/errors/app.error.js';
import { ERROR_CODES } from '../../src/errors/error.codes.js';

class OrderMockService {
	static generate({ availableUsers, availableCouriers, availableProducts }) {
		const selectedUser = faker.helpers.arrayElement(availableUsers);
		const selectedCourier = faker.helpers.arrayElement(availableCouriers);

		const selectedProds = Array.from(
			{ length: faker.number.int({ min: 1, max: 15 }) },
			() => faker.helpers.arrayElement(availableProducts),
		);

		const prodsFiltered = selectedProds.map((prod) => {
			return {
				product: prod.id,
				quantity: faker.number.int({ min: 1, max: 15 }),
				priceAtPurchase: prod.price,
			};
		});

		const weight = faker.number.int({ min: 10, max: 1000 });
		const cost = weight * 10;

		const fakeOrder = {
			customerName: selectedUser.name,
			customer: selectedUser.id,
			address: faker.location.direction(),
			weight,
			cost,
			status: faker.helpers.objectValue(ORDER_STATUS),
			priority: faker.helpers.objectValue(ORDER_PRIORITY),
			items: prodsFiltered,
			courierId: selectedCourier.id,
		};

		return fakeOrder;
	}

	static async generateMultiple(amount = 1) {
		const availableUsers = await UserRepository.getAll();
		const availableCouriers = await CouriersRepository.getAll();
		const availableProducts = await ProductsRepository.getAll();

		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new AppError(ERROR_CODES.INVALID_MOCK_AMOUNT);

		if (availableUsers.length === 0)
			throw new AppError(
				ERROR_CODES.MOCK_GENERATION_ERROR,
				'Actualmente no hay suficientes usuarios en la DB para crear este mock',
			);
		if (availableCouriers.length === 0)
			throw new AppError(
				ERROR_CODES.MOCK_GENERATION_ERROR,
				'Actualmente no hay suficientes couriers en la DB para crear este mock',
			);
		if (availableProducts.length === 0)
			throw new AppError(
				ERROR_CODES.MOCK_GENERATION_ERROR,
				'Actualmente no hay suficientes producs en la DB para crear este mock',
			);

		const fakeOrders = Array.from({ length: amount }, () =>
			this.generate({
				availableUsers,
				availableCouriers,
				availableProducts,
			}),
		);

		return fakeOrders;
	}

	static async insert(fakeArray) {
		const orders = await OrdersRepository.insertMany(fakeArray);
		return orders;
	}

	static async generateAndInsert(amount) {
		const generated = await this.generateMultiple(amount);
		const inserted = await this.insert(generated);

		return inserted;
	}
}

export default OrderMockService;
