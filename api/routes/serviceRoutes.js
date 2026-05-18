const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

router.get('/', serviceController.getAllServices);
router.get('/trader/:id', serviceController.getServicesByTrader);
router.get('/:id', serviceController.getServiceById);
router.post('/', protect, serviceController.addService);
router.put('/:id', protect, serviceController.editService);
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
