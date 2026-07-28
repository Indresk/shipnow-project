// "Proveedor" externo falso de tracking.
// DEUDA TECNICA (Modulo 2): simula una integracion externa (como una API de un
// courier real). Se llama INLINE desde la ruta de deliveries, sin abstraccion ni
// inyeccion de dependencias. El curso muestra como mockear esto en los tests.

// Estados posibles que "devolveria" el proveedor externo.
const TRACKING_STATES = [
	'assigned',
	'in_transit',
	'out_for_delivery',
	'delivered',
];

function getTrackingStatus(deliveryId) {
	// Logueamos la "llamada externa" (efecto secundario acoplado a proposito).
	console.log('Consultando tracking provider para delivery: ' + deliveryId);

	const index = Math.floor(Math.random() * 4);

	return TRACKING_STATES[index];
}

console.log(getTrackingStatus());

export { getTrackingStatus };
