const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

router.get('/getExample', productController.getExample);
router.post('/createProduct', productController.createProduct);

router.get('/getProductList', cartController.getProductList);
router.post('/addToShoppingCart', cartController.addToShoppingCart);

module.exports = router;