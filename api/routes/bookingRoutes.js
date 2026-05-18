const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.get('/trader/:id/stats', protect, bookingController.getTraderStats);
router.get('/trader/:id', protect, bookingController.getBookingsByTrader);
router.get('/:id', protect, bookingController.getBookingById);
router.post('/', bookingController.addBooking);
router.put('/:id/status', protect, bookingController.updateBookingStatus);

module.exports = router;
