const express = require('express');
const parentCategoryController = require('../controllers/parentCategoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: ParentCategory
 *  description: The parent categories management routes
 */

/**
 * @swagger
 * /parentCategory/all:
 *   get:
 *     summary: Get all parent categories in system
 *     tags: [ParentCategory]
 *     responses:
 *       200:
 *         description: Parent categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllParentCategory'
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
    .get(parentCategoryController.getAllParentCategory);

/**
 * @swagger
 * /parentCategory/under/{category}:
 *   get:
 *     summary: Get all sub categories under a parent categories in system
 *     tags: [ParentCategory]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *     responses:
 *       200:
 *         description: Sub categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoriesUnderParentCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No sub categories found
 */
router.route('/under/:category')
    .get(parentCategoryController.getAllSubCategoryUnder);

/**
 * @swagger
 * /parentCategory/create:
 *   post:
 *     summary: Creates a parent category in system
 *     tags: [ParentCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateParentCategory'
 *     responses:
 *       201:
 *         description: ParentCategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateParentCategorySuccess'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/create')
    .post(parentCategoryController.createParentCategory);

/**
 * @swagger
 * /parentCategory/delete/{category}:
 *   delete:
 *     summary: Deletes a parent category from system
 *     tags: [ParentCategory]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: The parent category id reference
 *     responses:
 *       200:
 *         description: ParentCategory deleted successfully
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/delete/:category')
    .delete(parentCategoryController.deleteParentCategory);

module.exports = router;