import logger from '../utils/logger.js';

export default function loggerMiddleware(req, res, next) {
	res.on('finish', () => {
		logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
	});
	next();
}
