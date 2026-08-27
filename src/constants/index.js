export const USER_ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

export const PRODUCT_STATUS = {
	AVAILABLE: 'available',
	OUT_OF_STOCK: 'out_of_stock',
};

export const ORDER_STATUS = {
	PENDING: 'pending',
	IN_TRANSIT: 'in_transit',
	DELIVERED: 'delivered',
};

export const ORDER_PRIORITY = {
	NORMAL: 'normal',
	HIGH: 'high',
};

export const DELIVERY_STATUS = {
	ASSIGNED: 'assigned',
	IN_TRANSIT: 'in_transit',
	DELIVERED: 'delivered',
};

export const ENVIRONMENT = {
	PROD: 'production',
	DEV: 'development',
	TEST: 'test',
};

export const DOCUMENT_TYPES = {
	DRIVER_LICENCE: { type: 'courier_licence', path: 'uploads/licences' },
	DELIVERY_PROOFS: { type: 'delivery_proof', path: 'uploads/proofs' },
	DOCS: { type: 'user_docs', path: 'uploads/documents' },
};

[
	(USER_ROLES,
	PRODUCT_STATUS,
	ORDER_STATUS,
	ORDER_PRIORITY,
	DELIVERY_STATUS,
	ENVIRONMENT,
	DOCUMENT_TYPES),
].forEach(Object.freeze);
