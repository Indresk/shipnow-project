import ProductsService from '../services/products.service.js';
import logger from '../utils/logger.js';

class ProductsController {
	static async getAll(req, res, next) {
		try {
			const products = await ProductsService.getAll();

			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const product = await ProductsService.getById(id);

			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const { name, price, stock, status } = req.body;

			const product = await ProductsService.create({
				name,
				price,
				stock,
				status,
			});

			logger.debug(`Product creado: ${product._id}`);
			res.status(201).json(product);
		} catch (error) {
			next(error);
		}
	}
}

export default ProductsController;
