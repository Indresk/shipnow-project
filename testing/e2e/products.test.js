import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import ProductMockService from '../../src/mocks/services/products.mock.service.js';
import { PRODUCT_STATUS } from '../../src/constants/index.js';

describe('Products API', () => {
	it('Debe listar productos con sus propiedades principales', async () => {
		const [product] = await ProductMockService.generateAndInsert();
		const response = await request(app).get('/api/products');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array').with.length(1);
		expect(response.body[0]).to.include.all.keys(
			'_id',
			'name',
			'price',
			'stock',
			'status',
		);
		expect(response.body[0]._id).to.equal(product.id);
	});

	it('Debe crear un producto válido', async () => {
		const response = await request(app).post('/api/products').send({
			name: 'Producto de prueba',
			price: 1250,
			stock: 20,
			status: PRODUCT_STATUS.AVAILABLE,
		});

		expect(response.status).to.equal(201);
		expect(response.body).to.include.all.keys(
			'_id',
			'name',
			'price',
			'stock',
			'status',
		);
		expect(response.body).to.include({
			name: 'Producto de prueba',
			price: 1250,
			stock: 20,
			status: PRODUCT_STATUS.AVAILABLE,
		});
	});

	it('Debe rechazar un producto con precio inválido', async () => {
		const response = await request(app).post('/api/products').send({
			name: 'Precio inválido',
			price: 0,
			stock: 10,
		});

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
	});

	it('Debe rechazar un producto con estado inválido', async () => {
		const response = await request(app).post('/api/products').send({
			name: 'Estado inválido',
			price: 100,
			stock: 10,
			status: 'disabled',
		});

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
		expect(response.body).to.have.property('message').that.is.a('string');
	});

	it('Debe informar cuando el producto no existe', async () => {
		const response = await request(app).get(
			'/api/products/507f1f77bcf86cd799439011',
		);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'product_not_found',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});
});
