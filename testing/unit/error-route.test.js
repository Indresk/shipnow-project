import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';

describe('Revision de manejo de rutas inexistentes', () => {
	describe('GET /', () => {
		it('Debe revisar si el manejo que hacemos de las rutas inexistentes es el esperado', async () => {
			const response = await request(app).get('/api/test/ruta-inexistente');

			expect(response.status).to.equal(404);
			expect(response.body.status).to.equal('error');
			expect(response.body).to.have.property('error');
			expect(response.body).to.have.property('message');
		});
	});
});
