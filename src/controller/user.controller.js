import UserService from '../services/users.service.js';
import logger from '../utils/logger.js';

class UserController {
	static async getAll(req, res, next) {
		try {
			const users = await UserService.getAll();

			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const { id } = req.params;
			const user = await UserService.getById(id);

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const { name, email, role } = req.body;

			const user = await UserService.create({ name, email, role });

			logger.debug(`User creado: ${user._id}`);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
