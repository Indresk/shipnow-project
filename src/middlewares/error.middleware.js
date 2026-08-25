import config from '../config/index.js';
import { ENVIRONMENT } from '../constants/index.js';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';
import logger from '../utils/logger.js';

export function notFoundHandler(req, res, next) {
	const error = new AppError(ERROR_CODES.ROUTE_NOT_FOUND);
	next(error);
}

export function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	const errorCode = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR;

	const response = {
		status: 'error',
		error: errorCode,
		message: err.message,
	};

	if (config.NODE_ENV != ENVIRONMENT.PROD && err.details)
		response.details = err.details;

	const { message: loggerMessage, ...loggerData } = response;

	if (statusCode >= 500) {
		logger.error(loggerMessage, {
			metadata: { statusCode, stack: err.stack, ...loggerData },
		});
	} else {
		logger.warning(loggerMessage, { metadata: { statusCode, ...loggerData } });
	}

	res.status(statusCode).json(response);
}
