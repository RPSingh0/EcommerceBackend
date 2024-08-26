const catchAsync = require('../utils/catchAsync');
const SubCategory = require('../models/subCategoryModel');

exports.getAllSubCategory = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find()
        .populate({
            path: 'parentCategory', select: '-_id -__v -createdOn'
        })
        .select('-__v');
    // .select('-_id -__v -createdOn');

    if (subCategories.length === 0) {
        return res.status(204).end();
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                subCategories: subCategories
            }
        });
    }
});

exports.createSubCategory = catchAsync(async (req, res, next) => {
    const {name, coverImage, parentCategory} = req.body;

    const subCategory = await SubCategory.create({
        name: name,
        coverImage: coverImage,
        parentCategory: parentCategory
    });

    const savedSubCategory = await SubCategory.findById(subCategory._id)
        .populate({
            path: 'parentCategory',
            select: '-_id -__v -createdOn'
        })
        .select('-__v -createdOn');
    // .select('-_id -__v -createdOn');

    return res.status(201).json({
        status: 'success',
        data: {
            subCategory: savedSubCategory
        }
    });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
    await SubCategory.findByIdAndDelete(req.params.category);
    return res.status(200).end();
});