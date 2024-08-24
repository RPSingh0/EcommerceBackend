const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: SubCategory
 *  description: The sub categories management routes
 */

/**
 * @swagger
 * /subCategory/all:
 *   get:
 *     summary: Get all sub categories in system
 *     tags: [SubCategory]
 *     responses:
 *       200:
 *         description: Sub categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllSubCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No parent categories found
 */
router.route('/all')
    .get(subCategoryController.getAllSubCategory);

/**
 * @swagger
 * /subCategory/create:
 *   post:
 *     summary: Creates a sub category in system
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubCategory'
 *     responses:
 *       201:
 *         description: Sub category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSubCategorySuccess'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/create')
    .post(subCategoryController.createSubCategory);

/**
 * @swagger
 * /subCategory/delete/{category}:
 *   delete:
 *     summary: Deletes a sub category from system
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           description: The sub category id reference
 *     responses:
 *       200:
 *         description: SubCategory deleted successfully
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/delete/:category')
    .delete(subCategoryController.deleteSubCategory);

module.exports = router;