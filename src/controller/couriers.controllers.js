const CouriersService = require('../services/couriers.service');
const CourierService = require('../services/couriers.service');

class CourierController {
	static async getAll(req, res) {
		try {
			const couriers = await CouriersService.getAll();
			res.json(couriers);
		} catch (error) {
			console.log('Error al listar couriers:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getById(req, res) {
		try {
			const courier = await CouriersService.getById(req.params.id);
			res.json(courier);
		} catch (error) {
			console.log('Error al buscar courier:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async create(req, res) {
		try {
			const { name, zone, available } = req.body;
			const courier = await CouriersService.create({
				name,
				zone,
				available,
			});

			console.log('Courier creado:', courier._id);
			res.status(201).json(courier);
		} catch (error) {
			console.log('Error al crear courier:', error.message);
			res.status(500).send('Error del servidor');
		}
	}
}

module.exports = CourierController;
