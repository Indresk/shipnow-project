import DeliveriesService from '../services/deliveries.service.js';

class DeliveriesController {
	static async getAll(req, res) {
		try {
			const deliveries = await DeliveriesService.getAll();
			res.json(deliveries);
		} catch (error) {
			console.log('Error al listar deliveries:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async getById(req, res) {
		try {
			const deliveryStatus = await DeliveriesService.getById(req.params.id);
			res.json(deliveryStatus);
		} catch (error) {
			console.log('Error al buscar delivery:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async create(req, res) {
		try {
			const { orderId, courierId, status } = req.body;
			const delivery = await DeliveriesService.create({
				orderId,
				courierId,
				status,
			});

			console.log('Delivery creada:', delivery._id);
			res.status(201).json(delivery);
		} catch (error) {
			console.log('Error al crear delivery:', error.message);
			res.status(500).send('Error del servidor');
		}
	}

	static async update(req, res) {
		try {
			const { status } = req.body;
			const { id } = req.params;

			const delivery = await DeliveriesService.update(id, status);
			console.log('Delivery actualizada:', delivery._id, '->', status);
			res.json(delivery);
		} catch (error) {
			console.log('Error al actualizar delivery:', error.message);
			res.status(500).send('Error del servidor');
		}
	}
}

export default DeliveriesController;
