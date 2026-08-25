import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';

describe('API Logger', () => {
	describe('GET /', () => {
		it('Debe generar todos los niveles de log esperados', async () => {
			const response = await request(app).get('/api/logger');

			expect(response.status).to.equal(200);
			expect(response.body.status).to.equal('success');
			expect(response.body).to.have.property('message');
		});
	});
});
