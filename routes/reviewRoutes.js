const express = require('express')
const authenticationController = require('../controllers/authenticationController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Review
 *  description: The review management routes
 */

/**
 * @swagger
 * /review/get/{productId}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     summary: Returns reviews by product id
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllReviewsByProductId'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/get/:productId')
    .get(reviewController.getReviewByProduct);

/**
 * @swagger
 * /review/create:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Creates a review for a product by user
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReview'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReviewSuccess'
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
    .post(authenticationController.protect, reviewController.createReview);

/**
 * @swagger
 * /review/update:
 *   patch:
 *     security:
 *       - Authorization: []
 *     summary: Creates a review for a product by user
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReview'
 *     responses:
 *       201:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateReviewSuccess'
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
router.route('/update')
    .patch(authenticationController.protect, reviewController.updateReview);

/**
 * @swagger
 * /review/delete:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Deletes a review for a product by user
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteReview'
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateReviewSuccess'
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
router.route('/delete')
    .post(authenticationController.protect, reviewController.deleteReview);

module.exports = router;