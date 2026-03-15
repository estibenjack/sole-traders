const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/averages', ratingController.getAllAverageRatings);
router.get('/trader/:id/average', ratingController.getAverageRating);
router.get('/trader/:id', ratingController.getRatingsByTrader);
router.post('/', ratingController.addRating);

module.exports = router;
