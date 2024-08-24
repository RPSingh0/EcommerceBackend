const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');

exports.getAllProduct = catchAsync(async (req, res, next) => {

    const products = await Product.find().select('-parentCategory -subCategory -__v');

    if (products.length === 0) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products: products
            }
        })
    }
});

exports.getAllProductBySubCategory = catchAsync(async (req, res, next) => {

    const products = await Product.aggregate([
        {
            $lookup: {
                from: "subCategory",
                localField: "subCategory",
                foreignField: "_id",
                as: "subCategory"
            }
        },
        {
            $match: {
                'subCategory.name': req.params.category
            }
        },
        {
            $project: {
                __v: 0,
                productImages: 0,
                brand: 0,
                createdOn: 0,
                parentCategory: 0,
                subCategory: 0
            }
        }
    ]);

    if (products.length === 0) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products: products
            }
        });
    }

});

exports.getAllProductByParentCategory = catchAsync(async (req, res, next) => {

    const products = await Product.aggregate([
        {
            $lookup: {
                from: "parentCategory",
                localField: "parentCategory",
                foreignField: "_id",
                as: "parentCategory"
            }
        },
        {
            $match: {
                'parentCategory.name': req.params.category
            }
        },
        {
            $project: {
                __v: 0,
                createdOn: 0,
                parentCategory: 0,
                subCategory: 0
            }
        }
    ]);

    if (products.length === 0) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products: products
            }
        });
    }

});

exports.getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.productId)
        .select('-__v');

    if (!product) {
        return res.status(204).end();
    } else {
        return res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                product: product
            }
        });
    }
});

exports.createProduct = catchAsync(async (req, res, next) => {
    const {
        name,
        description,
        keywords,
        price,
        brand,
        coverImage,
        productImages,
        parentCategory,
        subCategory
    } = req.body;

    const product = await Product.create({
        name: name,
        description: description,
        keywords: keywords,
        price: price,
        brand: brand,
        coverImage: coverImage,
        productImages: productImages,
        parentCategory: parentCategory,
        subCategory: subCategory
    });

    const savedProduct = await Product.findById(product._id).select('-__v');

    return res.status(201).json({
        status: 'success',
        data: {
            product: savedProduct
        }
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.productId);
    return res.status(200).end();
});