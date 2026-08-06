import { ERROR_CODES } from './error.codes.js';

export const errorsDictionary = {
	[ERROR_CODES.USER_NOT_FOUND]: {
		statusCode: 404,
		message: 'No se encontró el usuario solicitado',
	},
	[ERROR_CODES.USER_ALREADY_EXISTS]: {
		statusCode: 409,
		message: 'El usuario ya existe',
	},
	[ERROR_CODES.INVALID_USER_ROLE]: {
		statusCode: 400,
		message: 'El rol de usuario no es válido',
	},
	[ERROR_CODES.PRODUCT_NOT_FOUND]: {
		statusCode: 404,
		message: 'NO se encontró el producto solicitado',
	},
	[ERROR_CODES.ORDER_NOT_FOUND]: {
		statusCode: 404,
		message: 'No se encontró la orden solicitada',
	},
	[ERROR_CODES.ORDER_ITEMS_REQUIRED]: {
		statusCode: 400,
		message: 'La orden debe contener al menos un ítem',
	},
	[ERROR_CODES.INVALID_ORDER_STATUS]: {
		statusCode: 400,
		message: 'El estado de la orden no es válido',
	},
	[ERROR_CODES.ORDER_ALREADY_DELIVERED]: {
		statusCode: 409,
		message: 'La orden ya fue entregada',
	},
	[ERROR_CODES.DELIVERY_NOT_FOUND]: {
		statusCode: 404,
		message: 'No se encontró la entrega solicitada',
	},
	[ERROR_CODES.COURIER_NOT_FOUND]: {
		statusCode: 404,
		message: 'No se encontró el repartidor solicitado',
	},
	[ERROR_CODES.DELIVERY_ALREADY_ASSIGNED]: {
		statusCode: 409,
		message: 'La entrega ya fue asignada',
	},
	[ERROR_CODES.INVALID_DELIVERY_STATUS]: {
		statusCode: 400,
		message: 'El estado de la entrega no es válido',
	},
	[ERROR_CODES.INVALID_MOCK_AMOUNT]: {
		statusCode: 400,
		message: 'La cantidad solicitada para el mock no es válida',
	},
	[ERROR_CODES.MOCK_GENERATION_ERROR]: {
		statusCode: 500,
		message: 'Ocurrió un error al generar los datos mock',
	},
	[ERROR_CODES.DATABASE_ERROR]: {
		statusCode: 500,
		message: 'Ocurrió un error en la base de datos',
	},
	[ERROR_CODES.INTERNAL_SERVER_ERROR]: {
		statusCode: 500,
		message: 'Error interno del servidor',
	},
	[ERROR_CODES.CONFIG_ERROR]: {
		statusCode: 500,
		message: 'Ocurrió un error de configuración',
	},
	[ERROR_CODES.ROUTE_NOT_FOUND]: {
		statusCode: 404,
		message: 'No se encontró la ruta solicitada',
	},
	[ERROR_CODES.BAD_REQUEST]: {
		statusCode: 400,
		message: 'No se proporcionaron los datos necesarios para esa solicitud',
	},
};
