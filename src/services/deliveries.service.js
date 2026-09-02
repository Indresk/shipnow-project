import DeliveriesRepository from '../repositories/deliveries.repository.js';
import { getTrackingStatus } from '../services/trackingProvider.js';
import OrdersService from './orders.service.js';
import CouriersService from './couriers.service.js';
import { DELIVERY_STATUS, DOCUMENT_TYPES } from '../constants/index.js';
import mongoose from 'mongoose';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';

class DeliveriesService {
	static async getAll() {
		const deliveries = await DeliveriesRepository.getAll();
		return deliveries;
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

		const deliveries = await DeliveriesRepository.getPaginated({
			limit: safeLimit,
			page: pageNum,
		});

		return deliveries;
	}

	static async getById(id) {
		const delivery = await DeliveriesRepository.getById(id);

		if (!delivery) {
			throw new AppError(ERROR_CODES.DELIVERY_NOT_FOUND);
		}

		const tracking = getTrackingStatus(delivery._id);
		return {
			delivery,
			tracking,
		};
	}

	static async create({ orderId, courierId, status }) {
		const currentDate = new Date();

		if (!orderId || !courierId)
			throw new AppError(ERROR_CODES.BAD_REQUEST, 'Faltan orderId o courierId');

		const order = await OrdersService.getById(orderId);
		if (!order) throw new AppError(ERROR_CODES.ORDER_NOT_FOUND);

		const courier = await CouriersService.getById(courierId);
		if (!courier) throw new AppError(ERROR_CODES.COURIER_NOT_FOUND);

		const delivery = await DeliveriesRepository.create({
			orderId,
			courierId,
			status: status || DELIVERY_STATUS.ASSIGNED,
			assignedAt: currentDate,
		});

		return delivery;
	}
	static async update(id, status) {
		if (!status || !Object.values(DELIVERY_STATUS).includes(status)) {
			throw new AppError(ERROR_CODES.INVALID_DELIVERY_STATUS);
		}
		if (!mongoose.isValidObjectId(id))
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`La ID proporcionada no es un ID válido.`,
			);
		const delivery = await this.getById(id);

		if (!delivery) throw new AppError(ERROR_CODES.DELIVERY_NOT_FOUND);

		const deliveryUpdated = await DeliveriesRepository.update(id, status);
		return deliveryUpdated;
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

		const delivery = await DeliveriesRepository.getById(id);
		if (!delivery) throw new AppError(ERROR_CODES.DELIVERY_NOT_FOUND);

		const doc = {
			originalName: file.originalname,
			fileName: file.filename,
			path: file.path,
			mimeType: file.mimetype,
			size: file.size,
			type,
			uploadedAt: new Date(),
		};

		const deliveryUpdated = await DeliveriesRepository.addDoc(delivery.id, doc);
		return deliveryUpdated;
	}
}

export default DeliveriesService;
