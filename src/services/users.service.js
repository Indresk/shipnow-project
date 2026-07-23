const { USER_ROLES } = require('../constants');
const UserRepository = require('../repositories/users.repository');

class UserService {
	static async create({ name, email, role }) {
		if (!name || !email) {
			throw new Error('Faltan datos obligatorios del usuario');
		}

		if (!role) {
			const user = await UserRepository.create({ name, email });
			return user;
		}

		const validRoles = Object.values(USER_ROLES);
		const roleExist = validRoles.find((userRole) => userRole === role);

		if (!roleExist) throw new Error('Rol asignado para el usuario invalido');

		const user = await UserRepository.create({ name, email, role });
		return user;
	}

	static async findAll() {
		const users = await UserRepository.findAll();
		return users;
	}

	static async findById(id) {
		if (!id) throw new Error('Falta id del usuario a buscar');

		const user = await UserRepository.findById(id);

		if (!user) throw new Error('Usuario no encontrado');

		return user;
	}
}

module.exports = UserService;
