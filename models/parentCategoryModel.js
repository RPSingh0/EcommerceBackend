const mongoose = require('mongoose');

const parentCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

const ParentCategoryModel = mongoose.model('parentCategory', parentCategorySchema, 'parentCategory');
module.exports = ParentCategoryModel;