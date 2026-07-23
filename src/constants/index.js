const USER_ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

const PRODUCT_STATUS = {
	AVAILABLE: 'available',
	OUT_OF_STOCK: 'out_of_stock',
};

const ENVIRONMENT = {
	PROD: 'production',
	DEV: 'development',
};

[USER_ROLES, PRODUCT_STATUS, ENVIRONMENT].forEach(Object.freeze);

module.exports = {
	USER_ROLES,
	PRODUCT_STATUS,
	ENVIRONMENT,
};
