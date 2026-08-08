import mongoose from 'mongoose';
import { ORDER_PRIORITY, ORDER_STATUS } from '../constants/index.js';
import OrdersRepository from '../repositories/orders.repository.js';
import ProductsRepository from '../repositories/products.repository.js';
import UserService from './users.service.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import AppError from '../errors/app.error.js';

class OrdersService {
	static async getAll() {
		const allOrders = await OrdersRepository.getAll();

		return allOrders;
	}

	static async getById(id) {
		if (!id)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Id de orden no proporcionada',
			);
		if (!mongoose.isValidObjectId(id))
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`La ID proporcionada no es un ID válido.`,
			);

		const selectedOrder = await OrdersRepository.getById(id);
		if (!selectedOrder) throw new AppError(ERROR_CODES.ORDER_NOT_FOUND);

		return selectedOrder;
	}

	static async create({
		customerName,
		customer,
		address,
		weight,
		courierId,
		items,
		priority,
	}) {
		const fixItems = [];

		const userData = await UserService.getById(customer);

		if (!customerName || !address || !weight)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Falta nombre, dirección o peso en los datos del envio',
			);

		if (typeof weight !== 'number' || weight <= 0)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El peso debe ser un numero mayor a 0',
			);

		if (!mongoose.isValidObjectId(customer)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El usuario proporcionado no es un ID valido',
			);
		}
		if (!mongoose.isValidObjectId(courierId)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'El courier proporcionado no es un ID valido',
			);
		}

		if (!Object.values(ORDER_PRIORITY).includes(priority)) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'La prioridad proporcionada no es valida',
			);
		}

		if (!Array.isArray(items)) {
			throw AppError(
				ERROR_CODES.BAD_REQUEST,
				'Los items se entregaron en un formato incorrecto; debe ser un array.',
			);
		}

		if (items.length === 0) {
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'La orden debe contener al menos un item.',
			);
		}

		for (let index = 0; index < items.length; index++) {
			const item = items[index];
			const { product, quantity } = item;

			if (
				!item ||
				typeof item !== 'object' ||
				Array.isArray(item) ||
				!product ||
				quantity === undefined ||
				quantity === null
			) {
				throw new AppError(
					ERROR_CODES.BAD_REQUEST,
					`El item en la posición ${index} tiene un formato inválido.`,
				);
			}

			if (!mongoose.isValidObjectId(product)) {
				throw new AppError(
					ERROR_CODES.BAD_REQUEST,
					`El product del item en la posición ${index} no es un ObjectId válido.`,
				);
			}

			if (
				typeof quantity !== 'number' ||
				!Number.isFinite(quantity) ||
				quantity <= 0 ||
				!Number.isInteger(quantity)
			) {
				throw new AppError(
					ERROR_CODES.BAD_REQUEST,
					`La quantity del item en la posición ${index} debe ser un número mayor que 0 entero.`,
				);
			}

			const foundProduct = await ProductsRepository.getById(product);

			if (!foundProduct) {
				throw new AppError(
					ERROR_CODES.PRODUCT_NOT_FOUND,
					`No se encontró el producto del item en la posición ${index}.`,
				);
			}

			fixItems.push({
				product: foundProduct._id,
				quantity,
				priceAtPurchase: foundProduct.price,
			});
		}

		const shippingCost = weight * 10;

		const order = await OrdersRepository.create({
			customerName,
			customer,
			address,
			weight,
			cost: shippingCost,
			status: ORDER_STATUS.PENDING,
			priority,
			items: fixItems,
			courierId: courierId || null,
		});

		return { orderId: order._id, shippingCost: shippingCost };
	}

	static async updateStatus(status, id) {
		if (!id)
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				'Id de orden no proporcionada',
			);
		if (!status || !Object.values(ORDER_STATUS).includes(status)) {
			throw new AppError(ERROR_CODES.INVALID_ORDER_STATUS);
		}
		if (!mongoose.isValidObjectId(id))
			throw new AppError(
				ERROR_CODES.BAD_REQUEST,
				`La ID proporcionada no es un ID válido.`,
			);

		const order = await this.getById(id);

		const orderUpdated = await OrdersRepository.updateStatus(status, id);

		return orderUpdated;
	}
}

export default OrdersService;
