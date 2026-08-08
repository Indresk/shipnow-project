import Product from '../models/product.js';

class ProductsRepository {
	static async getAll() {
		const products = await Product.find();
		return products;
	}

	static async getById(id) {
		const product = await Product.findById(id);
		return product;
	}

	static async create({ name, price, stock, status }) {
		const newProd = await Product.create({
			name,
			price,
			stock,
			status,
		});

		return newProd;
	}

	static async insertMany(products) {
		const newProducts = await Product.insertMany(products);
		return newProducts;
	}
}

export default ProductsRepository;
