import { createServer } from 'http';
import config from './config/index.js';
import connectDB from './db.js';
import app from './app.js';
import logger from './utils/logger.js';

const server = createServer(app);

// Conectamos a la base y levantamos el server.
async function boot() {
	await connectDB();

	server.listen(config.PORT, () => {
		logger.info('ShipNow escuchando en el puerto ' + config.PORT);
	});
}

boot();
