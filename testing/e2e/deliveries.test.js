import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import UserMockService from '../../src/mocks/services/users.mock.service.js';
import CourierMockService from '../../src/mocks/services/couriers.mock.service.js';
import ProductMockService from '../../src/mocks/services/products.mock.service.js';
import { DELIVERY_STATUS, ORDER_PRIORITY } from '../../src/constants/index.js';

describe('Deliveries API', () => {
	const createOrder = async () => {
		const [user] = await UserMockService.generateAndInsert();
		const [courier] = await CourierMockService.generateAndInsert();
		const [product] = await ProductMockService.generateAndInsert();
		const response = await request(app)
			.post('/api/orders')
			.send({
				customerName: user.name,
				customer: user.id,
				address: 'Calle 123',
				weight: 5,
				courierId: courier.id,
				items: [{ product: product.id, quantity: 1 }],
				priority: ORDER_PRIORITY.HIGH,
			});

		return { orderId: response.body.orderId, courierId: courier.id };
	};

	it('Debe listar entregas con paginación', async () => {
		const response = await request(app).get('/api/deliveries');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('object');
		expect(response.body).to.include.all.keys(
			'docs',
			'totalDocs',
			'limit',
			'page',
			'totalPages',
			'hasNextPage',
			'hasPrevPage',
			'nextPage',
			'prevPage',
		);
		expect(response.body.docs).to.be.an('array');
	});

	it('Debe crear una entrega asignada a una orden y un courier', async () => {
		const { orderId, courierId } = await createOrder();
		const response = await request(app).post('/api/deliveries').send({
			orderId,
			courierId,
			status: DELIVERY_STATUS.ASSIGNED,
		});

		expect(response.status).to.equal(201);
		expect(response.body).to.include.all.keys(
			'_id',
			'orderId',
			'courierId',
			'status',
			'assignedAt',
		);
		expect(response.body.status).to.equal(DELIVERY_STATUS.ASSIGNED);
	});

	it('Debe devolver el tracking de una entrega existente', async () => {
		const { orderId, courierId } = await createOrder();
		const created = await request(app)
			.post('/api/deliveries')
			.send({ orderId, courierId });
		const response = await request(app).get(
			`/api/deliveries/${created.body._id}`,
		);

		expect(response.status).to.equal(200);
		expect(response.body).to.include.all.keys('delivery', 'tracking');
		expect(response.body.delivery).to.include.all.keys(
			'_id',
			'orderId',
			'courierId',
			'status',
		);
		expect(response.body.tracking).to.be.a('string');
	});

	it('Debe actualizar el estado de una entrega', async () => {
		const { orderId, courierId } = await createOrder();
		const created = await request(app)
			.post('/api/deliveries')
			.send({ orderId, courierId });
		const response = await request(app)
			.patch(`/api/deliveries/${created.body._id}/status`)
			.send({ status: DELIVERY_STATUS.IN_TRANSIT });

		expect(response.status).to.equal(200);
		expect(response.body).to.include.all.keys('_id', 'status');
		expect(response.body.status).to.equal(DELIVERY_STATUS.IN_TRANSIT);
	});

	it('Debe rechazar una entrega sin referencias obligatorias', async () => {
		const response = await request(app).post('/api/deliveries').send({
			status: DELIVERY_STATUS.ASSIGNED,
		});

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
		expect(response.body).to.have.property('message').that.is.a('string');
	});

	it('Debe rechazar un estado de entrega inválido', async () => {
		const response = await request(app)
			.patch('/api/deliveries/507f1f77bcf86cd799439011/status')
			.send({ status: 'cancelled' });

		expect(response.status).to.equal(400);
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_delivery_status',
		});
	});

	it('Debe informar cuando la entrega no existe', async () => {
		const response = await request(app).get(
			'/api/deliveries/507f1f77bcf86cd799439011',
		);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'delivery_not_found',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});
});
