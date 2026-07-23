const UserService = require('../services/users.service');

class UserController {
	static async create(req, res) {
		try {
			const { name, email, role } = req.body;

			const user = await UserService.create({ name, email, role });

			console.log('User creado:', user._id);
			res.status(201).json(user);
		} catch (error) {
			console.log('Error al crear user:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getAll(req, res) {
		try {
			const users = await UserService.findAll();
			res.json(users);
		} catch (error) {
			console.log('Error al listar users:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getById(req, res) {
		try {
			const user = await UserService.findById(req.params.id);
			res.json(user);
		} catch (error) {
			console.log('Error al buscar user:', error.message);
			res.status(500).send('Error del servidor');
		}
	}
}

module.exports = UserController;
