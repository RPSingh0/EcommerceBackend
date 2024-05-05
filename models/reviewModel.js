const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: [true, 'A review must have a product Id']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'A review must have a user Id']
    },
    review: {
        type: String,
        required: [true, 'A review must contain some review']
    },
    rating: {
        type: "Number",
        min: [1, 'A rating should not be less then 1'],
        max: [5, 'A rating should not be more then 5'],
        required: [true, 'A review must have a rating']
    }
});

reviewSchema.statics.updateAverageOnProduct = async function (productId) {

    const stats = await this.aggregate([
        {
            $match: {
                productId: productId
            }
        },
        {
            $group: {
                _id: "$productId",
                nRating: {$sum: 1},
                avgRating: {$avg: "$rating"}
            }
        }
    ]);

    console.log(stats);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: stats[0].avgRating,
            numRatings: stats[0].nRating
        });
    } else {
        console.log("inside else");
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            numRatings: 0
        });
    }
}

reviewSchema.post('save', async function () {
    console.log(this);
    await this.constructor.updateAverageOnProduct(this.productId);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    if (this.r) {
        await this.r.constructor.updateAverageOnProduct(this.r.productId);
    }
});

const ReviewModel = mongoose.model('review', reviewSchema, 'review');
module.exports = ReviewModel;