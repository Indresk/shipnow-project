import multer from 'multer';
import path from 'path';

const allowedMimeTypes = [
	'application/pdf',
	'image/jpeg',
	'image/png',
	'image/webp',
];

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const folder =
			req.body.type === 'delivery_proof'
				? 'uploads/proofs'
				: 'uploads/documents';
		cb(null, folder);
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, cb) => {
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Tipo de archivo no permitido'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});
export default upload;
