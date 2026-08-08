import winston from 'winston';
import path from 'node:path';
import fs from 'node:fs';

const { format, addColors, transports, createLogger } = winston;
const { combine, timestamp, errors, json, colorize, printf } = format;
import config from '../config/index.js';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ENVIRONMENT } from '../constants/index.js';

const customLevels = {
	levels: {
		debug: 5,
		http: 4,
		info: 3,
		warning: 2,
		error: 1,
		fatal: 0,
	},
	colors: {
		debug: 'blue',
		http: 'cyan',
		info: 'green',
		warning: 'yellow',
		error: 'red',
		fatal: 'red bold',
	},
};

addColors(customLevels.colors);

const logFormat = combine(
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	errors({ stack: true }),
	json(),
);

const consoleFormat = combine(
	colorize(),
	timestamp({ format: 'HH:mm:ss' }),
	printf(({ timestamp, level, message, ...metadata }) => {
		const hasMetadata = Object.keys(metadata).length > 0;
		const metadataText = hasMetadata
			? ` || metadata: ${JSON.stringify(metadata.metadata)}`
			: '';
		return `${timestamp} [${level}] ${message}${metadataText}`;
	}),
);

const consoleTransport = new transports.Console({
	level: config.NODE_ENV === ENVIRONMENT.DEV ? 'debug' : 'info',
	format: consoleFormat,
});

// Crear directorio para archivos de logs
const logsDir = path.resolve(process.cwd(), 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const errorRotateTransport = new DailyRotateFile({
	dirname: logsDir,
	filename: 'errors-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	level: 'error',
	maxFiles: '14d',
	maxSize: '20m',
	format: logFormat,
});

const logger = createLogger({
	levels: customLevels.levels,
	level: config.NODE_ENV === ENVIRONMENT.DEV ? 'debug' : 'info',
	format: logFormat,
	transports: [consoleTransport, errorRotateTransport],
});

export default logger;
