import mongoose from 'mongoose';
import { USER_ROLES } from '../constants/index.js';
import documentSchema from './documentSchema.js';

// Modelo de User (cliente).
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	role: {
		type: String,
		enum: Object.values(USER_ROLES),
		default: USER_ROLES.USER,
	}, // user | admin
	documents: {
		type: [documentSchema],
		default: [],
	},
});

export default mongoose.model('User', userSchema);
