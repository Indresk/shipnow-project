const Product = require('../models/product');

class ProductsRepository {
	static async create({ name, price, stock, status }) {
		const newProd = await Product.create({
			name,
			price,
			stock,
			status,
		});

		return newProd;
	}

	static async findAll() {
		const products = await Product.find();
		return products;
	}

	static async findById(id) {
		const product = await Product.findById(id);
		return product;
	}
}

module.exports = ProductsRepository;
