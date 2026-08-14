import { faker } from '@faker-js/faker';
import CouriersRepository from '../../../src/repositories/couriers.repository.js';
import AppError from '../../../src/errors/app.error.js';
import { ERROR_CODES } from '../../../src/errors/error.codes.js';

class CourierMockService {
	static generate() {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		const fakeCourier = {
			name: `${firstName} ${lastName}`,
			zone: faker.location.country(),
			available: faker.datatype.boolean(),
		};

		return fakeCourier;
	}

	static async generateMultiple(amount = 1) {
		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new AppError(ERROR_CODES.INVALID_MOCK_AMOUNT);
		const fakeCouriers = Array.from({ length: amount }, () => this.generate());

		return fakeCouriers;
	}

	static async insert(fakeArray) {
		const cuoriers = await CouriersRepository.insertMany(fakeArray);
		return cuoriers;
	}

	static async generateAndInsert(amount) {
		const generated = await this.generateMultiple(amount);
		const inserted = await this.insert(generated);

		return inserted;
	}
}

export default CourierMockService;
