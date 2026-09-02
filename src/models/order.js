import mongoose from 'mongoose';
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/index.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderItemSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
		priceAtPurchase: {
			type: Number,
		},
	},
	{ _id: false },
);

// Modelo de Order (envio/pedido).
const orderSchema = new mongoose.Schema({
	customerName: { type: String, required: true }, // se mantiene del v1 original
	customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	address: { type: String, required: true },
	weight: { type: Number, required: true },
	cost: { type: Number }, // se calcula en la ruta: cost = weight * 10
	status: {
		type: String,
		enum: Object.values(ORDER_STATUS),
		default: ORDER_STATUS.PENDING,
	}, // pending | in_transit | delivered
	priority: {
		type: String,
		enum: Object.values(ORDER_PRIORITY),
		default: ORDER_PRIORITY.NORMAL,
	}, // normal | high
	items: {
		type: [orderItemSchema],
		validate: (v) => v.length > 0,
	},
	courierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier' },
});

orderSchema.plugin(mongoosePaginate);

export default mongoose.model('Order', orderSchema);
