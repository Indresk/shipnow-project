import uploader from '../config/multer.js';

export function uploadDoc(req, res, next) {
	if (req.header('Content-type') == 'application/json') return next();
	else return uploader.single('document')(req, res, next);
}

export function uploadProof(req, res, next) {
	if (req.header('Content-type') == 'application/json') return next();
	else return uploader.single('proof')(req, res, next);
}
