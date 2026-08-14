import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../../src/app.js';
import { request } from 'express';

describe('Health check', () => {
	describe('GET /health', () => {
		it('Debe revisar si tenemos el health endpoint activo', () => {});

        const response = await request(app).get()
	});
});
