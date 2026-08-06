import { faker } from '@faker-js/faker';
import { PRODUCT_STATUS } from '../../src/constants/index.js';
import ProductsRepository from '../../src/repositories/products.repository.js';
import AppError from '../../src/errors/app.error.js';
import { ERROR_CODES } from '../../src/errors/error.codes.js';

class ProductMockService {
	static generate() {
		const fakeProduct = {
			name: faker.commerce.product(),
			price: faker.number.int({ min: 1000, max: 100000 }),
			stock: faker.number.int({ min: 10, max: 1000 }),
			status: faker.helpers.objectValue(PRODUCT_STATUS),
		};

		return fakeProduct;
	}

	static async generateMultiple(amount = 1) {
		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new AppError(ERROR_CODES.INVALID_MOCK_AMOUNT);
		const fakeProducts = Array.from({ length: amount }, () => this.generate());

		return fakeProducts;
	}

	static async insert(fakeArray) {
		const products = await ProductsRepository.insertMany(fakeArray);
		return products;
	}

	static async generateAndInsert(amount) {
		const generated = await this.generateMultiple(amount);
		const inserted = await this.insert(generated);

		return inserted;
	}
}

export default ProductMockService;
