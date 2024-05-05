const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

router.route('/all')
    .get(subCategoryController.getAllSubCategory);

router.route('/create')
    .post(subCategoryController.createSubCategory);

router.route('/delete/:category')
    .delete(subCategoryController.deleteSubCategory);

module.exports = router;