import mongoose from 'mongoose';
import config from './config/index.js';
import AppError from './errors/app.error.js';
import { ERROR_CODES } from './errors/error.codes.js';

async function connectDB() {
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log('Conectado a MongoDB:', config.MONGODB_URI);
	} catch (error) {
		// Manejo de errores crudo: solo logueamos y matamos el proceso.
		const errorCustom = new AppError(
			ERROR_CODES.DATABASE_ERROR,
			'Error al conectar a MongoDB:',
			error.message,
		);
		console.log(errorCustom);
		process.exit(1);
	}
}

export default connectDB;
