const ProductsService = require('../services/products.service');

class ProductsController {
	static async create(req, res) {
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
			console.log('Error al crear product:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getAll(req, res) {
		try {
			const products = await ProductsService.findAll();
			res.json(products);
		} catch (error) {
			console.log('Error al listar products:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getById(req, res) {
		try {
			const product = await ProductsService.findById(req.params.id);
			res.json(product);
		} catch (error) {
			console.log('Error al buscar product:', error.message);
			res.status(500).send('Error del servidor');
		}
	}
}

module.exports = ProductsController;
