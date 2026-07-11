const Product = require('../models/product');

class ProductsRepository {
	static async create({ name, price, stock, status }) {
		const newProd = Product.create({
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
		const products = await Product.findById(id);
		return products;
	}
}

module.exports = ProductsRepository;
