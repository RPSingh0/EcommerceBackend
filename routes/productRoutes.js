const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/all')
    .get(productController.getAllProduct);

router.route('/byId/:productId')
    .get(productController.getProductById);

router.route('/byParentCategory/:category')
    .get(productController.getAllProductByParentCategory);

router.route('/bySubCategory/:category')
    .get(productController.getAllProductBySubCategory);

router.route('/create')
    .post(productController.createProduct);

router.route('/delete/:productId')
    .delete(productController.deleteProduct);

module.exports = router;