import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import UserMockService from '../../src/mocks/services/users.mock.service.js';
import CourierMockService from '../../src/mocks/services/couriers.mock.service.js';
import ProductMockService from '../../src/mocks/services/products.mock.service.js';
import { DOCUMENT_TYPES, ORDER_PRIORITY } from '../../src/constants/index.js';

describe('Uploads API', () => {
	const file = (name = 'document.pdf', content = 'contenido de prueba') => ({
		buffer: Buffer.from(content),
		name,
	});

	const createDelivery = async () => {
		const [user] = await UserMockService.generateAndInsert();
		const [courier] = await CourierMockService.generateAndInsert();
		const [product] = await ProductMockService.generateAndInsert();
		const orderResponse = await request(app)
			.post('/api/orders')
			.send({
				customerName: user.name,
				customer: user.id,
				address: 'Calle 123',
				weight: 5,
				courierId: courier.id,
				items: [{ product: product.id, quantity: 1 }],
				priority: ORDER_PRIORITY.NORMAL,
			});
		const deliveryResponse = await request(app).post('/api/deliveries').send({
			orderId: orderResponse.body.orderId,
			courierId: courier.id,
		});

		return deliveryResponse.body._id;
	};

	it('Debe asociar un documento válido a un usuario', async () => {
		const [user] = await UserMockService.generateAndInsert();
		const uploaded = file();
		const response = await request(app)
			.post(`/api/users/${user.id}/documents`)
			.field('type', DOCUMENT_TYPES.DOCS.type)
			.attach('document', uploaded.buffer, uploaded.name);

		expect(response.status).to.equal(200);
		expect(response.body).to.include({ status: 'success' });
		expect(response.body.payload.documents).to.have.length(1);
		expect(response.body.payload.documents[0]).to.include({
			originalName: uploaded.name,
			type: DOCUMENT_TYPES.DOCS.type,
			mimeType: 'application/pdf',
		});
	});

	it('Debe asociar una prueba válida a una entrega', async () => {
		const deliveryId = await createDelivery();
		const uploaded = file('proof.png', 'imagen de prueba');
		const response = await request(app)
			.post(`/api/deliveries/${deliveryId}/proofs`)
			.field('type', DOCUMENT_TYPES.DELIVERY_PROOFS.type)
			.attach('proof', uploaded.buffer, uploaded.name);

		expect(response.status).to.equal(200);
		expect(response.body.payload.proofs).to.have.length(1);
		expect(response.body.payload.proofs[0]).to.include({
			originalName: uploaded.name,
			type: DOCUMENT_TYPES.DELIVERY_PROOFS.type,
			mimeType: 'image/png',
		});
	});

	it('Debe rechazar un usuario inexistente', async () => {
		const uploaded = file();
		const response = await request(app)
			.post('/api/users/507f1f77bcf86cd799439011/documents')
			.field('type', DOCUMENT_TYPES.DOCS.type)
			.attach('document', uploaded.buffer, uploaded.name);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'user_not_found',
		});
	});

	it('Debe rechazar una entrega sin archivo', async () => {
		const deliveryId = await createDelivery();
		const response = await request(app)
			.post(`/api/deliveries/${deliveryId}/proofs`)
			.field('type', DOCUMENT_TYPES.DELIVERY_PROOFS.type);

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
	});

	it('Debe rechazar un tipo de documento inválido', async () => {
		const [user] = await UserMockService.generateAndInsert();
		const uploaded = file();
		const response = await request(app)
			.post(`/api/users/${user.id}/documents`)
			.field('type', 'passport')
			.attach('document', uploaded.buffer, uploaded.name);

		expect(response.status).to.equal(400);
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_document_type',
		});
	});

	it('Debe rechazar un formato de archivo no permitido', async () => {
		const [user] = await UserMockService.generateAndInsert();
		const uploaded = file('malware.exe', 'contenido no permitido');
		const response = await request(app)
			.post(`/api/users/${user.id}/documents`)
			.field('type', DOCUMENT_TYPES.DOCS.type)
			.attach('document', uploaded.buffer, uploaded.name);

		expect(response.status).to.equal(400);
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_file_type',
		});
	});
});
