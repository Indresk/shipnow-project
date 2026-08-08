import logger from '../../src/utils/logger.js';
import UserMockService from '../services/users.mock.service.js';

class UserMockController {
	static async generate(req, res, next) {
		try {
			const { users } = req.body;
			logger.debug(`Se solicitaron generar ${users} mock users`);
			const usersGenerated = await UserMockService.generateMultiple(users);

			logger.http('GET /api/mocks/mockingusers 200');
			res.status(200).json(usersGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { users } = req.body;
			logger.debug(`Se solicitaron insertar en db ${users} mock users`);
			const usersInserted = await UserMockService.generateAndInsert(users);

			logger.http('POST /api/mocks/mockingusers 201');
			res.status(201).json(usersInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default UserMockController;
