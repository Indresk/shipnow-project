import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';

import app from '../../src/app.js';
import UserMockService from '../../src/mocks/services/users.mock.service.js';
import { USER_ROLES } from '../../src/constants/index.js';

describe('Users API', () => {
	it('Debe listar usuarios con sus propiedades principales', async () => {
		const [user] = await UserMockService.generateAndInsert();
		const response = await request(app).get('/api/users');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array').with.length(1);
		expect(response.body[0]).to.include.all.keys(
			'_id',
			'name',
			'email',
			'role',
		);
		expect(response.body[0]._id).to.equal(user.id);
	});

	it('Debe crear un usuario válido', async () => {
		const response = await request(app).post('/api/users').send({
			name: 'Usuario de prueba',
			email: 'usuario.prueba@example.com',
			role: USER_ROLES.USER,
		});

		expect(response.status).to.equal(201);
		expect(response.body).to.include.all.keys('_id', 'name', 'email', 'role');
		expect(response.body).to.include({
			name: 'Usuario de prueba',
			email: 'usuario.prueba@example.com',
			role: USER_ROLES.USER,
		});
	});

	it('Debe rechazar un usuario incompleto', async () => {
		const response = await request(app)
			.post('/api/users')
			.send({ name: 'Sin correo' });

		expect(response.status).to.equal(400);
		expect(response.body).to.include({ status: 'error', error: 'bad_request' });
		expect(response.body).to.have.property('message').that.is.a('string');
	});

	it('Debe rechazar un rol inválido', async () => {
		const response = await request(app).post('/api/users').send({
			name: 'Rol inválido',
			email: 'rol.invalido@example.com',
			role: 'operator',
		});

		expect(response.status).to.equal(400);
		expect(response.body).to.include({
			status: 'error',
			error: 'invalid_user_role',
		});
	});

	it('Debe informar cuando el usuario no existe', async () => {
		const response = await request(app).get(
			'/api/users/507f1f77bcf86cd799439011',
		);

		expect(response.status).to.equal(404);
		expect(response.body).to.include({
			status: 'error',
			error: 'user_not_found',
		});
		expect(response.body).to.have.property('message').that.is.a('string');
	});
});
