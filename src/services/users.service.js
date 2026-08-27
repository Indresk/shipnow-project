import mongoose from 'mongoose';
import { DOCUMENT_TYPES, USER_ROLES } from '../constants/index.js';
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

	static async addDoc({ id, type, file }) {
		if (!id || !file) {
			throw new AppError(ERROR_CODES.BAD_REQUEST);
		}

		const validTypes = Object.values(DOCUMENT_TYPES).map((doc) => doc.type);

		if (!validTypes.includes(type)) {
			throw new AppError(ERROR_CODES.INVALID_DOCUMENT_TYPE);
		}

		if (!mongoose.isValidObjectId(id)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`El id proporcionado no es válido`,
			);
		}

		const user = await UserRepository.getById(id);
		if (!user) throw new AppError(ERROR_CODES.USER_NOT_FOUND);

		const doc = {
			originalName: file.originalname,
			fileName: file.filename,
			path: file.path,
			mimeType: file.mimetype,
			size: file.size,
			type,
			uploadedAt: new Date(),
		};

		const userUpdated = await UserRepository.addDoc(user.id, doc);
		return userUpdated;
	}
}

export default UserService;
