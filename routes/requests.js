const express = require('express');
const { createRequest } = require('../controllers/requests');

const router = express.Router();

router.post('', createRequest);

module.exports = router;