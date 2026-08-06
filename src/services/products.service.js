import ProductsRepository from '../repositories/products.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import AppError from '../errors/app.error.js';

class ProductsService {
	static async create({
		name,
		price,
		stock = 0,
		status = PRODUCT_STATUS.OUT_OF_STOCK,
	}) {
		if (!name || price === undefined)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta precio y nombre del producto',
			);
		if (typeof price !== 'number' || price <= 0)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El precio debe ser un numero mayor o igual a 0',
			);

		if (typeof stock !== 'number' || stock <= 0)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El stock debe ser un numero mayor o igual a 0',
			);

		if (!Object.values(PRODUCT_STATUS).includes(status)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El status proporcionado no es valido',
			);
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
		const products = await ProductsRepository.findAll();
		return products;
	}

	static async findById(id) {
		if (!id)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta id del producto a buscar',
			);
		const product = await ProductsRepository.findById(id);

		if (!product) throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);

		return product;
	}
}

export default ProductsService;
