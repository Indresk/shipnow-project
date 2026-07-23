const USER_ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

const PRODUCT_STATUS = {
	AVAILABLE: 'available',
	OUT_OF_STOCK: 'out_of_stock',
};

const ORDER_STATUS = {
	PENDING: 'pending',
	IN_TRANSIT: 'in_transit',
	DELIVERED: 'delivered',
};

const ORDER_PRIORITY = {
	NORMAL: 'normal',
	HIGH: 'high',
};

const ENVIRONMENT = {
	PROD: 'production',
	DEV: 'development',
};

[USER_ROLES, PRODUCT_STATUS, ORDER_STATUS, ORDER_PRIORITY, ENVIRONMENT].forEach(
	Object.freeze,
);

module.exports = {
	USER_ROLES,
	PRODUCT_STATUS,
	ORDER_STATUS,
	ORDER_PRIORITY,
	ENVIRONMENT,
};
