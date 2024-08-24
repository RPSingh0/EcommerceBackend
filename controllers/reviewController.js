const catchAsync = require('../utils/catchAsync');
const ReviewModel = require('../models/reviewModel');

exports.createReview = catchAsync(async (req, res, next) => {

    const user = req.user;
    const {productId, rating, review} = req.body;

    if (!productId || !rating || !review) {
        throw new Error('A review should have a product id, a rating, a review text');
    }

    const isReviewAlreadyPresent = await ReviewModel.find({user: user._id, productId: productId});

    if (isReviewAlreadyPresent.length > 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Review already exists'
        });
    }

    const createdReview = await ReviewModel.create({
        productId: productId,
        user: user._id,
        review: review,
        rating: rating
    });

    createdReview.__v = undefined;

    res.status(201).json({
        status: 'success',
        data: {
            review: createdReview
        }
    });
});

exports.getReviewByProduct = catchAsync(async (req, res, next) => {
    const {productId} = req.params;

    const reviews = await ReviewModel.find({productId: productId})
        .populate({
            path: 'user',
            select: 'firstName lastName userImage'
        }).select('-__v');

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews: reviews
        }
    });
});

exports.updateReview = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {productId, review, rating} = req.body;

    const updatedReview = await ReviewModel.findOneAndUpdate({
        user: user._id,
        productId: productId
    }, {
        review: review,
        rating: rating
    }, {
        new: true,
        runValidators: true
    });

    if (!updatedReview) {
        return res.status(400).json({
            status: 'fail',
            message: 'Review does not exists or has been deleted'
        });
    }

    res.status(201).json({
        status: 'success',
        data: {
            review: updatedReview
        }
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {productId} = req.body;

    const deletedReview = await ReviewModel.findOneAndDelete({
        user: user._id,
        productId: productId
    });

    if (!deletedReview) {
        return res.status(400).json({
            status: 'fail',
            message: 'Review does not exists or belongs to different user'
        });
    }

    return res.status(200).end();
});