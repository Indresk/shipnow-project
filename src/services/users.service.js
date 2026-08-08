import mongoose from 'mongoose';
import { USER_ROLES } from '../constants/index.js';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import UserRepository from '../repositories/users.repository.js';

class UserService {
	static async getAll() {
		const users = await UserRepository.getAll();
		return users;
	}

	static async getById(id) {
		if (!id)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta id del usuario a buscar',
			);

		if (!mongoose.isValidObjectId(id)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`El id proporcionado no es válido`,
			);
		}

		const user = await UserRepository.getById(id);

		if (!user) throw new AppError(ERROR_CODES.USER_NOT_FOUND);

		return user;
	}

	static async create({ name, email, role }) {
		if (!name || !email) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta correo o nombre del usuario',
			);
		}

		if (!role) {
			const user = await UserRepository.create({ name, email });
			return user;
		}

		const validRoles = Object.values(USER_ROLES);
		const roleExist = validRoles.find((userRole) => userRole === role);

		if (!roleExist) throw new AppError(ERROR_CODES.INVALID_USER_ROLE);

		const user = await UserRepository.create({ name, email, role });
		return user;
	}
}

export default UserService;
