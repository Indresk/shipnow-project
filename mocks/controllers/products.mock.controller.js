import ProductMockService from '../services/products.mock.service.js';

class ProductMockController {
	static async generate(req, res) {
		try {
			const { products } = req.body;
			const productsGenerated =
				await ProductMockService.generateMultiple(products);

			res.status(200).json(productsGenerated);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
	static async insert(req, res) {
		try {
			const { products } = req.body;
			const productsInserted =
				await ProductMockService.generateAndInsert(products);

			res.status(200).json(productsInserted);
		} catch (error) {
			res.status(500).send(`Error del servidor ${error.message}`);
		}
	}
}

export default ProductMockController;
