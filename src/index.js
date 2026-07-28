import express from 'express';
import config from './config/index.js';
import connectDB from './db.js';
import { ENVIRONMENT } from './constants/index.js';

import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';
import couriersRouter from './routes/couriers.js';
import productsRouter from './routes/products.js';
import deliveriesRouter from './routes/deliveries.js';
import mocksRouter from './routes/mocks.js';

const app = express();

// Middleware para parsear JSON.
app.use(express.json());

// Montamos los routers. Toda la logica vive adentro de las rutas (controllers gordos).
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/couriers', couriersRouter);
app.use('/api/products', productsRouter);
app.use('/api/deliveries', deliveriesRouter);

// Mocks

if (config.NODE_ENV === ENVIRONMENT.DEV) app.use('/api/mocks', mocksRouter);

// Ruta de health check basica.
app.get('/', (req, res) => {
	res.send('ShipNow API v1 - corriendo');
});

// Conectamos a la base y levantamos el server.
connectDB();

app.listen(config.PORT, () => {
	console.log('ShipNow escuchando en el puerto ' + config.PORT);
});
