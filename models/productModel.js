const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name']
    },
    description: {
        type: String,
        required: [true, 'A product must have a description']
    },
    keywords: {
        type: [String],
        required: [true, 'A product must have some highlighted keywords'],
        validate: {
            validator: function (array) {
                return array.every(item => item.length > 3 && item.length < 60) && array.length <= 5;
            }
        }
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    brand: {
        type: String,
        required: [true, 'A product must have a brand']
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        default: 0
    },
    numRatings: {
        type: Number,
        default: 0
    },
    coverImage: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    productImages: [
        {
            type: String,
            required: [true, 'A product must have some product images']
        }
    ],
    parentCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'parentCategory',
            required: [true, 'A product must be associated with a parentCategory']
        }
    ],
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'subCategory',
        required: [true, 'A product must be associated with a subCategory']
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const ProductModel = mongoose.model('product', productSchema, 'product');
module.exports = ProductModel;