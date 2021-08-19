const express = require('express');
const { createRequest, getAllRequests, getRequest, updateRequest, deleteRequest} = require('../controllers/requests');

const router = express.Router();

router.get('/:id', getRequest);
router.get('', getAllRequests);
router.post('', createRequest);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);

module.exports = router;