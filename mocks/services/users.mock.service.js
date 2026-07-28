import { faker } from '@faker-js/faker';
import { USER_ROLES } from '../../src/constants/index.js';
import UserRepository from '../../src/repositories/users.repository.js';

class UserMockService {
	static generate() {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		const fakeUser = {
			name: `${firstName} ${lastName}`,
			email: faker.internet.email({ firstName, lastName }),
			role: faker.helpers.arrayElement(USER_ROLES),
		};

		return fakeUser;
	}

	static async generateMultiple(amount = 1) {
		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new Error(
				'Cantidad de usuarios para mock invalida, debe ser un entero mayor que 0',
			);
		const fakeUsers = Array.from({ length: amount }, () => this.generate());

		return fakeUsers;
	}

	static async insert(fakeArray) {
		const users = await UserRepository.insertMany(fakeArray);
		return users;
	}
}

export default UserMockService;
