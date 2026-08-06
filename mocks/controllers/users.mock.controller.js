import UserMockService from '../services/users.mock.service.js';

class UserMockController {
	static async generate(req, res, next) {
		try {
			const { users } = req.body;
			const usersGenerated = await UserMockService.generateMultiple(users);

			res.status(200).json(usersGenerated);
		} catch (error) {
			next(error);
		}
	}
	static async insert(req, res, next) {
		try {
			const { users } = req.body;
			const usersInserted = await UserMockService.generateAndInsert(users);

			res.status(200).json(usersInserted);
		} catch (error) {
			next(error);
		}
	}
}

export default UserMockController;
