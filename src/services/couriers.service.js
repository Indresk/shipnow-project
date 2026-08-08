import mongoose from 'mongoose';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import CouriersRepository from '../repositories/couriers.repository.js';

class CouriersService {
	static async getAll() {
		const couriers = await CouriersRepository.getAll();
		return couriers;
	}

	static async getById(id) {
		if (!id) throw new AppError(ERROR_CODES.BAD_REQUEST, 'Id no proporcionada');
		if (!mongoose.isValidObjectId(id))
			throw new AppError(ERROR_CODES.BAD_REQUEST, 'Id proporcionada no válida');

		const courier = await CouriersRepository.getById(id);

		if (!courier) throw new AppError(ERROR_CODES.COURIER_NOT_FOUND);
		return courier;
	}

	static async create({ name, zone, available }) {
		if (!name || !zone)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta nombre y zona del repartidor',
			);

		const courier = await CouriersRepository.create({
			name,
			zone,
			available: available !== undefined ? available : true,
		});

		return courier;
	}
}

export default CouriersService;
