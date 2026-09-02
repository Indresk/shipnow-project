import mongoose from 'mongoose';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import CouriersRepository from '../repositories/couriers.repository.js';

class CouriersService {
	static async getAll() {
		const couriers = await CouriersRepository.getAll();
		return couriers;
	}

	static async getPaginated({ limit = 10, page = 1 }) {
		const limitNum = Number(limit);
		const pageNum = Number(page);

		if (
			!Number.isInteger(limitNum) ||
			!Number.isInteger(pageNum) ||
			limitNum <= 0 ||
			pageNum <= 0
		) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Información de paginación incorrecta. "limit" y "page" deben ser enteros positivos.',
			);
		}

		const MAX_LIMIT = 100;
		const safeLimit = Math.min(limitNum, MAX_LIMIT);

		const couriers = await CouriersRepository.getPaginated({
			limit: safeLimit,
			page: pageNum,
		});

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
