const express = require('express');
const parentCategoryController = require('../controllers/parentCategoryController');

const router = express.Router();

router.route('/all')
    .get(parentCategoryController.getAllParentCategory);

router.route('/under/:category')
    .get(parentCategoryController.getAllSubCategoryUnder);

router.route('/create')
    .post(parentCategoryController.createParentCategory);

router.route('/delete/:category')
    .delete(parentCategoryController.deleteParentCategory);

module.exports = router;