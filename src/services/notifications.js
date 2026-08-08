// "Servicio" falso de notificaciones.
// DEUDA TECNICA (Modulo 1): este sender se importa y se llama INLINE desde la ruta
// de orders, acoplando la logica de negocio con un efecto secundario.

import logger from '../utils/logger.js';

// El curso muestra como desacoplar esto (inyeccion de dependencias / capa de servicios).
function sendNotification(message) {
	logger.info('Notificacion enviada: ' + message);
}

export default sendNotification;
