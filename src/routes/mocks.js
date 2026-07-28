import express from 'express';
import UserMockController from '../../mocks/controllers/users.mock.controller.js';

const router = express.Router();

router.get('/mockingusers', UserMockController.generateUsers);
router.get('/mockingorders');
router.post('/generateData');

export default router;
