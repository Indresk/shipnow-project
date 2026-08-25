import { expect } from 'chai';
import request from 'supertest';
import { describe } from 'mocha';

import app from '../../src/app.js';

describe('Mocks API', () => {
	it('Debe devolver usuarios mock', async () => {
		const response = await request(app).get('/api/mocks/mockingusers?users=2');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array').with.length(2);
		expect(response.body[0]).to.include.all.keys('name', 'email', 'role');
	});

	it('Debe devolver productos mock', async () => {
		const response = await request(app).get(
			'/api/mocks/mockingproducts?products=2',
		);

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array').with.length(2);
		expect(response.body[0]).to.include.all.keys(
			'name',
			'price',
			'stock',
			'status',
		);
	});

	it('Debe devolver la cantidad solicitada de mocks agregados', async () => {
		const response = await request(app).get(
			'/api/mocks/generateData?users=2&products=1&couriers=1',
		);

		expect(response.status).to.equal(200);
		expect(response.body).to.have.all.keys('users', 'products', 'couriers');
		expect(response.body.users).to.be.an('array').with.length(2);
		expect(response.body.products).to.be.an('array').with.length(1);
		expect(response.body.couriers).to.be.an('array').with.length(1);
	});

	it('Debe insertar la cantidad solicitada de mocks', async () => {
		const response = await request(app).post('/api/mocks/generateData').send({
			users: 1,
			products: 1,
			couriers: 1,
		});

		expect(response.status).to.equal(201);
		expect(response.body).to.have.all.keys('users', 'products', 'couriers');
		expect(response.body.users).to.be.an('array').with.length(1);
		expect(response.body.products).to.be.an('array').with.length(1);
		expect(response.body.couriers).to.be.an('array').with.length(1);
	});

	it('Debe responder error por que la cantidad pasada es invalida', async () => {
		const response = await request(app).post('/api/mocks/generateData').send({
			users: -1,
			products: 2,
			orders: 0,
		});

		expect(response.status).to.equal(400);
		expect(response.body).to.include.all.keys('status', 'error', 'message');
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_mock_amount',
		});
	});
});
