const catchAsync = require('../utils/catchAsync');
const ParentCategory = require('../models/parentCategoryModel');
const SubCategory = require('../models/subCategoryModel');

exports.getAllParentCategory = catchAsync(async (req, res, next) => {
    const parentCategories = await ParentCategory.find().select('-__v');

    if (parentCategories.length === 0) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: parentCategories.length,
            data: {
                parentCategories: parentCategories
            }
        });
    }
});

exports.getAllSubCategoryUnder = catchAsync(async (req, res, next) => {

    const subCategories = await SubCategory.aggregate([
        {
            $lookup: {
                from: 'parentCategory',
                localField: 'parentCategory',
                foreignField: '_id',
                as: 'parentCategory'
            }
        },
        {
            $match: {
                'parentCategory.name': req.params.category
            }
        },
        {
            $project: {
                _id: 0,
                __v: 0,
                createdOn: 0,
                parentCategory: 0
            }
        }
    ]);

    if (subCategories.length === 0) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: subCategories.length,
            data: {
                subCategories: subCategories
            }
        });
    }
});

exports.createParentCategory = catchAsync(async (req, res, next) => {
    const {name} = req.body;

    const parentCategory = await ParentCategory.create({
        name: name
    });

    const savedParentCategory = await ParentCategory.findById(parentCategory._id).select('-__v -createdOn');

    return res.status(201).json({
        status: 'success',
        data: {
            parentCategory: savedParentCategory
        }
    });
});


exports.deleteParentCategory = catchAsync(async (req, res, next) => {
    await ParentCategory.findByIdAndDelete(req.params.category);
    return res.status(200).end();
});