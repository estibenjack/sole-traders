const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.get('/trader/:id', availabilityController.getAvailabilityByTrader);

module.exports = router;
