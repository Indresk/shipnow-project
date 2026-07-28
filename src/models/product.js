import mongoose from 'mongoose';
import { PRODUCT_STATUS } from '../constants/index.js';

// Modelo de Product (producto del catalogo).
const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, default: 0 },
	status: {
		type: String,
		enum: Object.values(PRODUCT_STATUS),
		default: PRODUCT_STATUS.OUT_OF_STOCK,
	}, // available | out_of_stock
});

export default mongoose.model('Product', productSchema);
