import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';

describe('Revision de rutas de soporte', () => {
	it('Debe revisar si tenemos el health endpoint activo', async () => {
		const response = await request(app).get('/');

		expect(response.status).to.equal(200);
		expect(response.body.status).to.equal('success');
		expect(response.body).to.have.property('message');
	});

	it('Debe generar todos los niveles de log esperados', async () => {
		const response = await request(app).get('/api/logger');

		expect(response.status).to.equal(200);
		expect(response.body.status).to.equal('success');
		expect(response.body).to.have.property('message');
	});

	it('Debe revisar si el manejo que hacemos de las rutas inexistentes es el esperado', async () => {
		const response = await request(app).get('/api/test/ruta-inexistente');

		expect(response.status).to.equal(404);
		expect(response.body).to.include.all.keys('status', 'error', 'message');
		expect(response.body).to.include({
			status: 'error',
			error: 'route_not_found',
		});
		expect(response.body.message).to.be.a('string');
	});

	it('Debe devolver la documentación', async () => {
		const response = await request(app).get('/api/docs');

		expect(response.status).to.be.oneOf([200, 301, 302]);
	});
});
