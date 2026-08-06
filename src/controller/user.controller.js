import UserService from '../services/users.service.js';

class UserController {
	static async create(req, res, next) {
		try {
			const { name, email, role } = req.body;

			const user = await UserService.create({ name, email, role });

			console.log('User creado:', user._id);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const users = await UserService.findAll();
			res.json(users);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		try {
			const user = await UserService.findById(req.params.id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
