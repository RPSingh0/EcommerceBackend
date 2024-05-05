const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Product = require("../models/productModel");
const User = require("../models/userModel");
const {getTotalPrice} = require("../utils/cartUtils");
const {updatedCartWithOrder} = require("../utils/orderUtils");

exports.updateCart = catchAsync(async (req, res, next) => {
    const user = req.user;
    let {cart} = user;
    const {identifier, quantity} = req.body;

    if (!identifier || !quantity) {
        throw new Error("Please provide identifier and quantity for item")
    }

    const existingItemIndex = cart.findIndex(cartItem => cartItem.identifier === identifier);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = quantity;
    } else {
        cart.push({identifier: identifier, quantity: quantity});
    }

    user.cart = cart;

    const itemIds = cart.map(item => item.identifier);
    const products = await Product.find({_id: {$in: itemIds}}).select("name price coverImage");
    const totalPrice = getTotalPrice(cart, products);

    user.currentCartPrice = totalPrice;
    await user.save({validateBeforeSave: false});

    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    });
});

exports.getItemDetailsInCart = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {cart} = user;

    const itemIds = cart.map(item => item.identifier);

    const products = await Product.find({_id: {$in: itemIds}}).select("name price coverImage");

    res.status(200).json({
        status: "success",
        data: {
            products: products
        }
    });
});

exports.purchaseCart = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {cart} = user;
    const {transactionId} = req.params;

    const itemIds = cart.map(item => item.identifier);
    const products = await Product.find({_id: {$in: itemIds}}).select("name price");

    const line_items_array = cart.map(item => {
        const productDetail = products.filter(i => i.id === item.identifier)[0];

        return {
            price_data: {
                currency: "inr",
                unit_amount: Number(productDetail.price) * 100,
                product_data: {
                    name: productDetail.name
                }
            },
            quantity: item.quantity
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `http://rpsr.in/order/${transactionId}`,
        cancel_url: 'http://rpsr.in/cart',
        customer_email: "rpalsingh715@gmail.com",
        client_reference_id: transactionId,
        line_items: line_items_array,
        mode: 'payment',
        metadata: {
            userId: String(user._id),
            cart: JSON.stringify(cart)
        }
    });

    res.status(200).json({
        status: 'success',
        payAt: session.url
    });
});

exports.webhookCheckout = catchAsync(async (req, res, next) => {

    let event;

    try {
        const signature = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const userId = event.data.object.metadata.userId
        const transactionId = event.data.object.client_reference_id;
        let purchasedItemsWithQuantity = JSON.parse(event.data.object.metadata.cart);

        const user = await User.findById(userId);
        const {cart} = user;

        // adding all purchased items to previous order
        purchasedItemsWithQuantity = purchasedItemsWithQuantity.map(item => {
            return {...item, transactionId: transactionId, purchasedOn: Date.now()}
        });

        // adding current purchase to orders
        user.previousOrders = user.previousOrders.concat(purchasedItemsWithQuantity);

        // updating user cart
        user.cart = updatedCartWithOrder(cart, purchasedItemsWithQuantity);

        // saving the user
        await user.save({validateBeforeSave: false});
    }

    res.status(200).json({received: true});
});

exports.getOrderByOrderId = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {previousOrders} = user;
    const {orderId} = req.params;

    const requestedOrder = previousOrders.filter(order => order.transactionId === orderId);

    if (requestedOrder.length === 0) {
        return res.status(200).json({
            status: 'fail',
            order: requestedOrder
        });
    }

    // get the products and map them to ids
    const itemIds = requestedOrder.map(item => item.identifier);
    const products = await Product.find({_id: {$in: itemIds}}).select("name price");
    let totalPrice = 0;

    const orderDetails = requestedOrder.map(order => {

        const product = products.filter(p => p.id === order.identifier)[0];
        totalPrice += order.quantity * product.price;

        return {
            quantity: order.quantity,
            name: product.name,
            price: product.price,
            total: order.quantity * product.price
        }
    });

    res.status(200).json({
        status: 'success',
        order: orderDetails,
        total: totalPrice
    });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const {_id} = req.user;

    const orderDetails = await User.aggregate([
        {
            $match: {
                _id: _id
            }
        },
        {
            $unwind: '$previousOrders'
        },
        {
            $addFields: {
                identifierObjectId: {
                    $toObjectId: "$previousOrders.identifier"
                }
            }
        },
        {
            $lookup: {
                from: 'product',
                localField: 'identifierObjectId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {$unwind: '$productDetails'},
        {
            $group: {
                _id: '$previousOrders.transactionId',
                totalPurchase: {
                    $sum: {$multiply: ['$previousOrders.quantity', '$productDetails.price']}
                },
                totalQuantity: {$sum: '$previousOrders.quantity'},
                purchasedOn: {
                    $max: '$previousOrders.purchasedOn'
                }
            }
        },
        {
            $project: {
                transactionId: '$_id',
                totalPurchase: 1,
                totalQuantity: 1,
                purchasedOn: 1,
                _id: 0
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            orderDetails: orderDetails
        }
    });
});

exports.getAllOrdersForReview = catchAsync(async (req, res, next) => {
    const {_id} = req.user;

    const orderDetails = await User.aggregate([
        {
            $match: {
                _id: _id
            }
        },
        {
            $unwind: '$previousOrders'
        },
        {
            $addFields: {
                identifierObjectId: {
                    $toObjectId: "$previousOrders.identifier"
                }
            }
        },
        {
            $lookup: {
                from: 'product',
                localField: 'identifierObjectId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {$unwind: '$productDetails'},
        {
            $group: {
                _id: "$previousOrders.transactionId",
                totalQuantity: {
                    $sum: "$previousOrders.quantity"
                },
                totalPurchase: {
                    $sum: {
                        $multiply: [
                            "$previousOrders.quantity",
                            "$productDetails.price"
                        ]
                    }
                },
                itemDetails: {
                    $push: {
                        productId: "$previousOrders.identifier",
                        productName: "$productDetails.name",
                        productImage: "$productDetails.coverImage",
                        productPrice: "$productDetails.price",
                        quantity: "$previousOrders.quantity"
                    }
                },
                purchasedOn: {
                    $max: "$previousOrders.purchasedOn"
                }
            }
        },
        {
            $sort: {
                purchasedOn: -1
            }
        },
        {
            $project: {
                transactionId: "$_id",
                totalQuantity: 1,
                totalPurchase: 1,
                itemDetails: 1,
                purchasedOn: 1,
                _id: 0
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            orderDetails: orderDetails
        }
    });

});

exports.clearCart = catchAsync(async (req, res, next) => {
    const user = req.user;
    user.cart = [];
    user.currentCartPrice = 0;

    await user.save({validateBeforeSave: false});
    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    })
});

exports.deleteItemFromCart = catchAsync(async (req, res, next) => {
    const user = req.user;
    let {cart} = user;
    const itemIdentifierToDelete = req.body.identifier;

    user.cart = cart.filter(item => item.identifier !== itemIdentifierToDelete);
    await user.save({validateBeforeSave: false});

    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    })
});

exports.updateWishlist = catchAsync(async (req, res, next) => {
    const user = req.user;
    let {wishlist} = user;
    const {identifier} = req.body;

    if (!identifier) {
        throw new Error("Please provide identifier for item")
    }

    const existingItemIndex = wishlist.findIndex(cartItem => cartItem.identifier === identifier);

    if (existingItemIndex === -1) {
        wishlist.push({identifier: identifier})
    }

    user.wishlist = wishlist;
    await user.save({validateBeforeSave: false});

    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    });
});

exports.getItemDetailsInWishlist = catchAsync(async (req, res, next) => {
    const user = req.user;
    const {wishlist} = user;

    const itemIds = wishlist.map(item => item.identifier);

    const products = await Product.find({_id: {$in: itemIds}}).select("name price coverImage averageRating");

    res.status(200).json({
        status: "success",
        data: {
            products: products
        }
    });
});

exports.clearWishlist = catchAsync(async (req, res, next) => {
    const user = req.user;
    user.wishlist = [];
    await user.save({validateBeforeSave: false});

    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    })
});

exports.deleteItemFromWishlist = catchAsync(async (req, res, next) => {
    const user = req.user;
    let {wishlist} = user;
    const itemIdentifierToDelete = req.body.identifier;

    user.wishlist = wishlist.filter(item => item.identifier !== itemIdentifierToDelete);
    await user.save({validateBeforeSave: false});

    res.status(201).json({
        status: "success",
        data: {
            user: user
        }
    })
});