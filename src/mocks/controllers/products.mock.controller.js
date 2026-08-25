import logger from '../../../src/utils/logger.js';
import ProductMockService from '../services/products.mock.service.js';

class ProductMockController {
	static async generate(req, res, next) {
		try {
			const { products } = req.query;
			logger.debug(`Se solicitaron generar ${products} mock products`);
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
			logger.debug(`Se solicitaron insertar en db ${products} mock products`);
			const productsInserted =
				await ProductMockService.generateAndInsert(products);

			res.status(201).json(productsInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default ProductMockController;
