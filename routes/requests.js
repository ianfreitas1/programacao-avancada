const express = require('express');
const { createRequest, getAllRequests, getRequest } = require('../controllers/requests');

const router = express.Router();

router.get('/:id', getRequest);
router.get('', getAllRequests);
router.post('', createRequest);

module.exports = router;