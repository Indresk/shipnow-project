import dotenv from 'dotenv';
import { styleText } from 'node:util';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';

dotenv.config();

const REQUIRES_ENV_VARS = ['PORT', 'NODE_ENV', 'MONGODB_URI'];

for (const key of REQUIRES_ENV_VARS) {
	if (!process.env[key]) {
		const envError = new AppError(
			ERROR_CODES.CONFIG_ERROR,
			`Falta la variable de entorno obligatoria: ${key}`,
		);

		// No puedo usar el logger aquí porque genera una dependencia circular ya que el logger para inicializarse necesita saber si se encuentra en desarrollo o prod
		console.error(
			`${new Date().toLocaleTimeString(undefined, {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			})} [`,
			styleText('red', 'fatal'),
			`] ${envError.message} || metadata:${JSON.stringify(envError)}`,
		);
		process.exit(1);
	}
}

const config = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	MONGODB_URI: process.env.MONGODB_URI,
};

Object.freeze(config);

export default config;
