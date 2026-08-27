import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { DOCUMENT_TYPES } from '../constants/index.js';
import AppError from '../errors/app.error.js';
import { ERROR_CODES } from '../errors/error.codes.js';

const allowedMimeTypes = [
	'application/pdf',
	'image/jpeg',
	'image/png',
	'image/webp',
];

function ensureFolderExist(folder) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}
}

function getDestinationFolder(req) {
	const documentType = req.body?.type;

	switch (documentType) {
		case DOCUMENT_TYPES.DRIVER_LICENCE.type:
			return DOCUMENT_TYPES.DRIVER_LICENCE.path;
		case DOCUMENT_TYPES.DELIVERY_PROOFS.type:
			return DOCUMENT_TYPES.DELIVERY_PROOFS.path;
		default:
			return DOCUMENT_TYPES.DOCS.path;
	}
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const folder = getDestinationFolder(req);
		ensureFolderExist(folder);
		cb(null, folder);
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
		cb(null, fileName);
	},
});

// Añadir custom error para que tenga coherencia con el resto del proyecto

const fileFilter = (req, file, cb) => {
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new AppError(ERROR_CODES.INVALID_FILE_TYPE));
	}
};

const uploader = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

export default uploader;
