const express = require('express');
const router = express.Router();

router.get('/api/mocks/mockingusers');
router.get('/api/mocks/mockingorders');

router.post('/api/mocks/generateData');

module.exports = router;
