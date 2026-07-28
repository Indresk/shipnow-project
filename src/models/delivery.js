import mongoose from 'mongoose';
import { DELIVERY_STATUS } from '../constants/index.js';

// Modelo de Delivery (entrega: vincula un Order con un Courier).
const deliverySchema = new mongoose.Schema({
	orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
	courierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier' },
	status: {
		type: String,
		enum: Object.values(DELIVERY_STATUS),
		default: DELIVERY_STATUS.ASSIGNED,
	}, // assigned | in_transit | delivered
	assignedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Delivery', deliverySchema);
