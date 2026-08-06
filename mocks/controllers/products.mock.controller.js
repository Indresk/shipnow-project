import ProductMockService from '../services/products.mock.service.js';

class ProductMockController {
	static async generate(req, res, next) {
		try {
			const { products } = req.body;
			const productsGenerated =
				await ProductMockService.generateMultiple(products);

			res.status(200).json(productsGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { products } = req.body;
			const productsInserted =
				await ProductMockService.generateAndInsert(products);

			res.status(200).json(productsInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default ProductMockController;
