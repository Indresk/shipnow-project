import ProductsService from '../services/products.service.js';

class ProductsController {
	static async create(req, res, next) {
		try {
			const { name, price, stock, status } = req.body;

			const product = await ProductsService.create({
				name,
				price,
				stock,
				status,
			});

			console.log('Product creado:', product._id);
			res.status(201).json(product);
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const products = await ProductsService.findAll();
			res.json(products);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const product = await ProductsService.findById(req.params.id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
}

export default ProductsController;
