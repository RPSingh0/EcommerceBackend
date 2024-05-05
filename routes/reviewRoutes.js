const express = require('express')
const authenticationController = require('../controllers/authenticationController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.route('/get/:productId')
    .get(reviewController.getReviewByProduct);

router.route('/create')
    .post(authenticationController.protect, reviewController.createReview);

router.route('/update')
    .patch(authenticationController.protect, reviewController.updateReview);

router.route('/delete')
    .post(authenticationController.protect, reviewController.deleteReview);

module.exports = router;