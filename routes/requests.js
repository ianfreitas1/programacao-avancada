const express = require('express');
const { createRequest, getAllRequests } = require('../controllers/requests');

const router = express.Router();

router.get('', getAllRequests);
router.post('', createRequest);

module.exports = router;