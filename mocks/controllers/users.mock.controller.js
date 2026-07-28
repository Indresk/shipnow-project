import UserMockService from '../services/users.mock.service.js';

class UserMockController {
	static async generateUsers(req, res) {
		try {
			const { users } = req.body;
			const usersGenerated = await UserMockService.generateMultiple(users);

			res.status(200).json(usersGenerated);
		} catch (error) {
			res.status(500).send('Error del servidor ', error.message);
		}
	}
	static async insertUsers(req, res) {
		try {
			const { users } = req.body;
			const usersGenerated = await UserMockService.generateMultiple(users);
			const usersInserted = await UserMockService.insert(usersGenerated);

			res.status(200).json(usersInserted);
		} catch (error) {
			res.status(500).send('Error del servidor ', error.message);
		}
	}
}

export default UserMockController;
