const express = require('express');
const {
  createRequest,
  getAllRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', getRequest);
router.get('', getAllRequests);
router.post('', protect, createRequest);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
