import ProductsRepository from '../repositories/products.repository.js';
import { PRODUCT_STATUS } from '../constants/index.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import AppError from '../errors/app.error.js';
import mongoose from 'mongoose';

class ProductsService {
	static async getAll() {
		const products = await ProductsRepository.getAll();
		return products;
	}

	static async getPaginated({ limit = 10, page = 1 }) {
		const limitNum = Number(limit);
		const pageNum = Number(page);

		if (
			!Number.isInteger(limitNum) ||
			!Number.isInteger(pageNum) ||
			limitNum <= 0 ||
			pageNum <= 0
		) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Información de paginación incorrecta. "limit" y "page" deben ser enteros positivos.',
			);
		}

		const MAX_LIMIT = 100;
		const safeLimit = Math.min(limitNum, MAX_LIMIT);

		const products = await ProductsRepository.getPaginated({
			limit: safeLimit,
			page: pageNum,
		});

		return products;
	}

	static async getById(id) {
		if (!id)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta id del producto a buscar',
			);
		if (!mongoose.isValidObjectId(id))
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`La ID proporcionada no es un ID válido.`,
			);

		const product = await ProductsRepository.getById(id);

		if (!product) throw new AppError(ERROR_CODES.PRODUCT_NOT_FOUND);

		return product;
	}

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
}

export default ProductsService;
