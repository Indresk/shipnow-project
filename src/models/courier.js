import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Modelo de Courier (repartidor).
const courierSchema = new mongoose.Schema({
	name: { type: String, required: true },
	zone: { type: String, required: true },
	available: { type: Boolean, default: true },
});

courierSchema.plugin(mongoosePaginate);

export default mongoose.model('Courier', courierSchema);
