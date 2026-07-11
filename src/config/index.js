const dotenv = require('dotenv');

dotenv.config();

const REQUIRES_ENV_VARS = ['PORT', 'NODE_ENV', 'MONGO_URI'];

for (const key of REQUIRES_ENV_VARS) {
	if (!process.env[key]) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
}

const config = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	MONGO_URI: process.env.MONGO_URI,
};

module.exports = config;
