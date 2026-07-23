const { default: mongoose } = require('mongoose');
const { USER_ROLES, ORDER_PRIORITY, ORDER_STATUS } = require('../constants');
const OrdersRepository = require('../repositories/orders.repository');
const ProductsRepository = require('../repositories/products.repository');
const UserService = require('./users.service');

class OrdersService {
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

		const userData = UserService.findById(customer);

		if (!customerName || !address || !weight)
			throw new Error('Faltan datos obligatorios del envio');

		if (typeof weight !== 'number' || weight <= 0)
			throw new Error('El peso debe ser un numero mayor a 0');

		if (!mongoose.isValidObjectId(customer)) {
			throw new Error('El usuario proporcionado no es un ID valido');
		}

		if (!Object.values(ORDER_PRIORITY).includes(priority)) {
			throw new Error('La prioridad proporcionada no es valida');
		}

		if (!Array.isArray(items)) {
			throw new Error(
				'Los items se entregaron en un formato incorrecto; debe ser un array.',
			);
		}

		if (items.length === 0) {
			throw new Error('La orden debe contener al menos un item.');
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
				throw new Error(
					`El item en la posición ${index} tiene un formato inválido.`,
				);
			}

			if (!mongoose.isValidObjectId(product)) {
				throw new Error(
					`El product del item en la posición ${index} no es un ObjectId válido.`,
				);
			}

			if (
				typeof quantity !== 'number' ||
				!Number.isFinite(quantity) ||
				quantity <= 0 ||
				!Number.isInteger(quantity)
			) {
				throw new Error(
					`La quantity del item en la posición ${index} debe ser un número mayor que 0 entero.`,
				);
			}

			const foundProduct = await ProductsRepository.findById(product);

			if (!foundProduct) {
				throw new Error(
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

	static async getAll() {
		const allOrders = await OrdersRepository.getAll();

		return allOrders;
	}

	static async getById(id) {
		if (!id) throw new Error('Id de orden no proporcionada');
		if (!mongoose.isValidObjectId(id))
			throw new Error(`La ID proporcionada no es un ID válido.`);

		const selectedOrder = await OrdersRepository.getById(id);
		if (!selectedOrder) throw new Error('Orden no encontrado');

		return selectedOrder;
	}

	static async updateStatus(status, id) {
		if (!status) throw new Error('Falta el status');
		if (!id) throw new Error('Id de orden no proporcionada');
		if (!Object.values(ORDER_STATUS).includes(status)) {
			throw new Error('El status proporcionado no es valido');
		}
		if (!mongoose.isValidObjectId(id))
			throw new Error(`La ID proporcionada no es un ID válido.`);

		const order = await this.getById(id);

		const orderUpdated = await OrdersRepository.updateStatus(status, id);

		return orderUpdated;
	}
}

module.exports = OrdersService;
