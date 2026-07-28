import { faker } from '@faker-js/faker';
import { PRODUCT_STATUS } from '../../src/constants/index.js';
import ProductsRepository from '../../src/repositories/products.repository.js';

class ProductMockService {
	static generate() {
		const fakeProduct = {
			name: faker.commerce.product(),
			price: faker.number.int({ min: 1000, max: 100000 }),
			stock: faker.number.int({ min: 10, max: 1000 }),
			status: faker.helpers.arrayElement(PRODUCT_STATUS),
		};

		return fakeProduct;
	}

	static async generateMultiple(amount = 1) {
		if (isNaN(parseInt(amount)) || amount <= 0)
			throw new Error(
				'Cantidad de productos para mock invalida, debe ser un entero mayor que 0',
			);
		const fakeProducts = Array.from({ length: amount }, () => this.generate());

		return fakeProducts;
	}

	static async insert(fakeArray) {
		const products = await ProductsRepository.insertMany(fakeArray);
		return products;
	}
}

export default ProductMockService;
