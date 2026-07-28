import { faker } from '@faker-js/faker';
import CouriersRepository from '../../src/repositories/couriers.repository.js';

class CourierMockService {
	static generate() {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		const fakeCourier = {
			name: `${firstName} ${lastName}`,
			zone: faker.location.country(),
			available: faker.datatype.boolean,
		};

		return fakeCourier;
	}

	static async generateMultiple(amount = 1) {
		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new Error(
				'Cantidad de cuoriers para mock invalida, debe ser un entero mayor que 0',
			);
		const fakeCouriers = Array.from({ length: amount }, () => this.generate());

		return fakeCouriers;
	}

	static async insert(fakeArray) {
		const cuoriers = await CouriersRepository.insertMany(fakeArray);
		return cuoriers;
	}
}

export default CourierMockService;
