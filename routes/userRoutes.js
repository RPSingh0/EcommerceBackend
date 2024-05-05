const express = require('express')
const authenticationController = require('../controllers/authenticationController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup')
    .post(authenticationController.signup);

router.route('/login')
    .post(authenticationController.login);

router.route('/login/byToken')
    .post(authenticationController.loginWithToken);

router.route('/forgotPassword')
    .post(authenticationController.forgotPassword);

router.route('/resetPassword/:token')
    .post(authenticationController.resetPassword);

router.route('/updatePassword')
    .post(authenticationController.protect, authenticationController.updatePassword);

router.route('/updateMe')
    .patch(authenticationController.protect, authenticationController.updateUser);

router.route('/purchaseCart/:transactionId')
    .get(authenticationController.protect, userController.purchaseCart);

router.route('/order/:orderId')
    .get(authenticationController.protect, userController.getOrderByOrderId);

router.route('/getAllOrders')
    .get(authenticationController.protect, userController.getAllOrdersForReview);

router.route('/getAllOrdersForReview')
    .get(authenticationController.protect, userController.getAllOrdersForReview);

router.route('/updateCart')
    .post(authenticationController.protect, userController.updateCart);

router.route('/deleteItem')
    .post(authenticationController.protect, userController.deleteItemFromCart)

router.route('/clearCart')
    .post(authenticationController.protect, userController.clearCart);

router.route('/getItemDetailsInCart')
    .get(authenticationController.protect, userController.getItemDetailsInCart);

router.route('/updateWishlist')
    .post(authenticationController.protect, userController.updateWishlist);

router.route('/deleteItemWishlist')
    .post(authenticationController.protect, userController.deleteItemFromWishlist)

router.route('/clearWishlist')
    .post(authenticationController.protect, userController.clearWishlist);

router.route('/getItemDetailsInWishlist')
    .get(authenticationController.protect, userController.getItemDetailsInWishlist);

module.exports = router;