import express from 'express';
import { swaggerSpecs } from './docs/swagger.config.js';
import swaggerUiExpress from 'swagger-ui-express';

import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';
import couriersRouter from './routes/couriers.js';
import productsRouter from './routes/products.js';
import deliveriesRouter from './routes/deliveries.js';
import mocksRouter from './routes/mocks.js';
import loggerRouter from './routes/loggerTest.js';
import {
	errorHandler,
	notFoundHandler,
} from './middlewares/error.middleware.js';

import { ENVIRONMENT } from './constants/index.js';
import config from './config/index.js';
import loggerMiddleware from './middlewares/logger.middleware.js';

const app = express();

// Middleware para parsear JSON.
app.use(express.json());
app.use(loggerMiddleware);

// Montamos los routers. Toda la logica vive adentro de las rutas .
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/couriers', couriersRouter);
app.use('/api/products', productsRouter);
app.use('/api/deliveries', deliveriesRouter);

// Dejamos las rutas de Mock

if (config.NODE_ENV != ENVIRONMENT.PROD) {
	app.use('/api/mocks', mocksRouter);
	app.use('/api/logger', loggerRouter);
	app.use(
		'/api/docs',
		swaggerUiExpress.serve,
		swaggerUiExpress.setup(swaggerSpecs),
	);
}

// Ruta de health check basica.
app.get('/', (req, res) => {
	res
		.status(200)
		.json({ status: 'success', message: 'ShipNow API v1 - corriendo' });
});

// Dejamos esuchando los middlewares de error

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
