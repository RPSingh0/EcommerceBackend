const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: The parent categories management routes
 */

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products in system
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllProducts'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No products found
 */
router.route('/all')
    .get(productController.getAllProduct);

/**
 * @swagger
 * /product/byId/{productId}:
 *   get:
 *     summary: Get product by product id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: The product id
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductById'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No product found by id
 */
router.route('/byId/:productId')
    .get(productController.getProductById);

/**
 * @swagger
 * /product/byParentCategory/{category}:
 *   get:
 *     summary: Get products by parent category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           description: The parent category name
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductByParentCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No products found
 */
router.route('/byParentCategory/:category')
    .get(productController.getAllProductByParentCategory);

/**
 * @swagger
 * /product/bySubCategory/{category}:
 *   get:
 *     summary: Get products by sub category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           description: sub category name
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductBySubCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       204:
 *         description: No products found
 */
router.route('/bySubCategory/:category')
    .get(productController.getAllProductBySubCategory);

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Creates a product in system
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductSuccess'
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/create')
    .post(productController.createProduct);

/**
 * @swagger
 * /product/delete/{productId}:
 *   delete:
 *     summary: Deletes a product from system
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: The parent category id reference
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Internal server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/delete/:productId')
    .delete(productController.deleteProduct);

module.exports = router;