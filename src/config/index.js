import dotenv from 'dotenv';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';

dotenv.config();

const REQUIRES_ENV_VARS = ['PORT', 'NODE_ENV', 'MONGODB_URI'];

for (const key of REQUIRES_ENV_VARS) {
	if (!process.env[key]) {
		throw new AppError(
			ERROR_CODES.CONFIG_ERROR,
			`Falta la variable de entorno obligatoria: ${key}`,
		);
	}
}

const config = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	MONGODB_URI: process.env.MONGODB_URI,
};

Object.freeze(config);

export default config;
