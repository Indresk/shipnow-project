const ProductsRepository = require('../repositories/products.repository');
const { PRODUCT_STATUS } = require('../constants');

class ProductsService {
	static async create({
		name,
		price,
		stock = 0,
		status = PRODUCT_STATUS.OUT_OF_STOCK,
	}) {
		if (!name || price === undefined)
			throw new Error('Faltan datos obligatorios del producto');
		if (typeof price !== 'number' || price < 0)
			throw new Error('El precio debe ser un numero mayor o igual a 0');

		if (!Object.values(PRODUCT_STATUS).includes(status)) {
			throw new Error('El status proporcionado no es valido');
		}

		const product = await ProductsRepository.create({
			name,
			price,
			stock,
			status,
		});

		return product;
	}

	static async findAll() {
		const products = ProductsRepository.findAll();
		return products;
	}

	static async findById(id) {
		if (!id) throw new Error('Falta id del producto a buscar');
		const product = ProductsRepository.findById(id);

		if (!product) throw new Error('Producto no encontrado');

		return product;
	}
}

module.exports = ProductsService;
