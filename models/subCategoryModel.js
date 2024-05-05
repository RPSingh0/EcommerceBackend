const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    parentCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'parentCategory'
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const SubCategoryModel = mongoose.model('subCategory', subCategorySchema, 'subCategory');
module.exports = SubCategoryModel;