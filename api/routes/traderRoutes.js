const express = require('express');
const router = express.Router();
const traderController = require('../controllers/traderController');

router.get('/:id/private', traderController.getTraderProfileInfoById);
router.get('/:id', traderController.getTraderById);
router.put('/:id', traderController.editTrader);
router.delete('/:id', traderController.deleteTrader);
router.get('/', traderController.getAllTraders);
router.post('/', traderController.addTrader);

module.exports = router;
