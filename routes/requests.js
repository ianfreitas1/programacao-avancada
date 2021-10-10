const express = require('express');
const {
  createRequest,
  getAllRequests,
  getRequest,
  updateRequest,
  subscribeToClass,
  deleteRequest,
} = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', getRequest);
router.get('', protect, getAllRequests);
router.post('', protect, createRequest);
router.put('/:id', protect, updateRequest);
router.put('/subscribe/:id', protect, subscribeToClass);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
