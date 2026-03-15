const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/trader/:id/stats', bookingController.getTraderStats);
router.get('/trader/:id', bookingController.getBookingsByTrader);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.addBooking);
router.put('/:id/status', bookingController.updateBookingStatus);

module.exports = router;
