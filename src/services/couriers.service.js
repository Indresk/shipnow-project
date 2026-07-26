const CouriersRepository = require('../repositories/couriers.repository');

class CouriersService {
	static async getAll() {
		const deliveries = await CouriersRepository.getAll();
		return deliveries;
	}
	static async getById(id) {
		if (!id) throw new Error('Id no proporcionada');
		const courier = await CouriersRepository.getById(id);
		if (!courier) throw new Error('Repartidor no encontrado');
		return courier;
	}
	static async create({ name, zone, available }) {
		if (!name || !zone)
			throw new Error('Faltan datos obligatorios del repartidor');

		const courier = await CouriersRepository.create({
			name,
			zone,
			available: available !== undefined ? available : true,
		});

		return courier;
	}
}

module.exports = CouriersService;
