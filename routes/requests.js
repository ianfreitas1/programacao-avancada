const express = require('express');
const {
  createRequest,
  getAllRequests,
  getMyRequests,
  updateRequest,
  subscribeToClass,
  unsubscribeFromClass,
  deleteRequest,
} = require('../controllers/requests');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/myRequests', protect, getMyRequests);
router.get('', protect, getAllRequests);
router.post('', protect, createRequest);
router.put('/:id', protect, updateRequest);
router.put('/subscribe/:id', protect, subscribeToClass);
router.put('/unsubscribe/:id', protect, unsubscribeFromClass);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
