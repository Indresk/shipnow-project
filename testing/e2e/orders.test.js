import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import { ORDER_STATUS, ORDER_PRIORITY } from '../../src/constants/index.js';

import CourierMockService from '../../src/mocks/services/couriers.mock.service.js';
import UserMockService from '../../src/mocks/services/users.mock.service.js';
import ProductMockService from '../../src/mocks/services/products.mock.service.js';
import OrderMockService from '../../src/mocks/services/orders.mock.service.js';

describe('Orders API', () => {
	let testingUser;
	let testingCourier;
	let testingProds;

	beforeEach(async () => {
		[testingUser] = await UserMockService.generateAndInsert();
		[testingCourier] = await CourierMockService.generateAndInsert();
		testingProds = await ProductMockService.generateAndInsert(3);
	});

	const validOrder = () => ({
		customerName: testingUser.name,
		customer: testingUser.id,
		address: 'Av. Siempre Viva 742',
		weight: 10,
		courierId: testingCourier.id,
		items: testingProds.map((product) => ({
			product: product.id,
			quantity: 2,
		})),
		priority: ORDER_PRIORITY.NORMAL,
	});

	it('Debe obtener la lista de ordenes con paginación', async () => {
		const [order] = await OrderMockService.generateAndInsert();
		const response = await request(app).get('/api/orders');

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
		expect(response.body.docs[0]).to.include.all.keys(
			'_id',
			'items',
			'courierId',
			'priority',
			'status',
		);
	});

	it('Debe registrar una nueva orden', async () => {
		const response = await request(app).post('/api/orders').send(validOrder());

		expect(response.status).to.equal(201);
		expect(response.body).to.include.all.keys('orderId', 'shippingCost');
		expect(response.body.orderId).to.be.a('string');
		expect(response.body.shippingCost).to.equal(100);
	});

	it('Debe consultar una orden creada por su id', async () => {
		const created = await request(app).post('/api/orders').send(validOrder());
		const response = await request(app).get(
			`/api/orders/${created.body.orderId}`,
		);

		expect(response.status).to.equal(200);
		expect(response.body).to.include.all.keys(
			'customerName',
			'customer',
			'address',
			'weight',
			'items',
			'status',
			'priority',
		);
		expect(response.body.items).to.have.length(3);
	});

	it('Debe actualizar el estado de una orden', async () => {
		const created = await request(app).post('/api/orders').send(validOrder());
		const response = await request(app)
			.patch(`/api/orders/${created.body.orderId}/status`)
			.send({ status: ORDER_STATUS.IN_TRANSIT });

		expect(response.status).to.equal(200);
		expect(response.body).to.include.all.keys('_id', 'status');
		expect(response.body.status).to.equal(ORDER_STATUS.IN_TRANSIT);
	});

	it('Debe rechazar una orden sin items con el error definido', async () => {
		const response = await request(app)
			.post('/api/orders')
			.send({ ...validOrder(), items: [] });

		expect(response.status).to.equal(400);
		expect(response.body).to.include.all.keys('status', 'error', 'message');
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
	});

	it('Debe rechazar un estado de orden inválido', async () => {
		const created = await request(app).post('/api/orders').send(validOrder());
		const response = await request(app)
			.patch(`/api/orders/${created.body.orderId}/status`)
			.send({ status: 'cancelled' });

		expect(response.status).to.equal(400);
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_order_status',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});

	it('Debe informar cuando la orden no existe', async () => {
		const response = await request(app).get(
			'/api/orders/507f1f77bcf86cd799439011',
		);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'order_not_found',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});
});
