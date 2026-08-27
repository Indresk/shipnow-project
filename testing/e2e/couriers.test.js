import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import CourierMockService from '../../src/mocks/services/couriers.mock.service.js';

describe('Couriers API', () => {
	it('Debe listar repartidores con sus propiedades principales', async () => {
		const [courier] = await CourierMockService.generateAndInsert();
		const response = await request(app).get('/api/couriers');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array');
		expect(response.body[0]).to.include.all.keys(
			'_id',
			'name',
			'zone',
			'available',
		);
	});

	it('Debe crear un repartidor válido', async () => {
		const response = await request(app).post('/api/couriers').send({
			name: 'Repartidor de prueba',
			zone: 'Centro',
			available: true,
		});

		expect(response.status).to.equal(201);
		expect(response.body).to.include.all.keys(
			'_id',
			'name',
			'zone',
			'available',
		);
		expect(response.body).to.include({
			name: 'Repartidor de prueba',
			zone: 'Centro',
			available: true,
		});
	});

	it('Debe rechazar un repartidor incompleto', async () => {
		const response = await request(app)
			.post('/api/couriers')
			.send({ name: 'Sin zona' });

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
		expect(response.body).to.have.property('message').that.is.a('string');
	});

	it('Debe informar cuando el repartidor no existe', async () => {
		const response = await request(app).get(
			'/api/couriers/507f1f77bcf86cd799439011',
		);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'courier_not_found',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});
});
