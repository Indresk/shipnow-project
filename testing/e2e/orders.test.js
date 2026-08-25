import { expect } from 'chai';
import request from 'supertest';
import { describe } from 'mocha';

import app from '../../src/app';
import order from '../../src/models/order';
import { USER_ROLES, ORDER_STATUS } from '../../src/constants';
import UserRepository from '../../src/repositories/users.repository';
import CouriersRepository from '../../src/repositories/couriers.repository';
import CourierMockService from '../mocks/services/couriers.mock.service';
import UserMockService from '../mocks/services/users.mock.service';
import User from '../../src/models/user';
import Courier from '../../src/models/courier';

describe('Orders API', () => {
	before(async () => {
		const testingUser = await UserMockService.generateAndInsert()[0];
		const testingCourier = await CourierMockService.generateAndInsert()[0];
	});
	it('Obtener lista de pedidos', async () => {
		const response = await request(app).get('api/orders');

		expect(response.status).to.equal(200);
		expect(response.body).to.be.an('array');
	});
	it('', async () => {});
	it('', async () => {});
	it('', async () => {});
	after(async () => {
		User.deleteOne({ _id: testingUser.id });
		Courier.deleteOne({ _id: testingCourier.id });
	});
});
