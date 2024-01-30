const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/',orderController.getOrder);

// create an order
router.post('/', orderController.createOrder);

// update an order from multiple users
router.put('/:orderId', orderController.updateOrder);

// payment on order
router.post('/:orderId/payment', orderController.paymentOnOrder);

module.exports = router;
