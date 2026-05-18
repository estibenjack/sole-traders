const express = require('express');
const router = express.Router();
const traderController = require('../controllers/traderController');
const { protect } = require('../middleware/auth');

router.get('/:id/private', protect, traderController.getTraderProfileInfoById);
router.get('/:id', traderController.getTraderById);
router.put('/:id', protect, traderController.editTrader);
router.delete('/:id', protect, traderController.deleteTrader);
router.get('/', traderController.getAllTraders);
router.post('/', traderController.addTrader);

module.exports = router;
