const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAllServices);
router.get('/trader/:id', serviceController.getServicesByTrader);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.addService);
router.put('/:id', serviceController.editService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
