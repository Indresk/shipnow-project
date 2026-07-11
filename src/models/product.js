const mongoose = require('mongoose');
const { PRODUCT_STATUS } = require('../constants');

// Modelo de Product (producto del catalogo).
const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, default: 0 },
	status: { type: String, default: PRODUCT_STATUS.OUT_OF_STOCK }, // available | out_of_stock
});

module.exports = mongoose.model('Product', productSchema);
