const express = require('express')
const authenticationController = require('../controllers/authenticationController');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user management routes
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Registers a new user for the application
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/signup')
    .post(authenticationController.signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Logs in user and returns the jwt auth token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/login')
    .post(authenticationController.login);

/**
 * @swagger
 * /user/login/byToken:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Logs in user with email jwt and returns new jwt token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginByToken'
 *     responses:
 *       200:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/login/byToken')
    .post(authenticationController.loginWithToken);

/**
 * @swagger
 * /user/forgotPassword:
 *   post:
 *     summary: Generates password reset link for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserForgotPassword'
 *     responses:
 *       200:
 *         description: Reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginByTokenSuccess'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/forgotPassword')
    .post(authenticationController.forgotPassword);

/**
 * @swagger
 * /user/resetPassword/{token}:
 *   post:
 *     summary: Resets password for user by reset token
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPasswordReset'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       400:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/resetPassword/:token')
    .post(authenticationController.resetPassword);

/**
 * @swagger
 * /user/updatePassword:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Updates password for current logged-in user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPasswordUpdate'
 *     responses:
 *       200:
 *         description: Password update success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/updatePassword')
    .post(authenticationController.protect, authenticationController.updatePassword);

/**
 * @swagger
 * /user/updateMe:
 *   patch:
 *     security:
 *       - Authorization: []
 *     summary: Updates user info for logged-in user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMe'
 *     responses:
 *       201:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/updateMe')
    .patch(authenticationController.protect, authenticationController.updateUser);

/**
 * @swagger
 * /user/purchaseCart/{transactionId}:
 *   get:
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     summary: Purchase the items in user cart
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Payment link generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseCartResponse'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/purchaseCart/:transactionId')
    .get(authenticationController.protect, userController.purchaseCart);

/**
 * @swagger
 * /user/order/{orderId}:
 *   get:
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     summary: Returns order by id
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderById'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/order/:orderId')
    .get(authenticationController.protect, userController.getOrderByOrderId);

/**
 * @swagger
 * /user/getAllOrders:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all orders by user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllOrders'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/getAllOrders')
    .get(authenticationController.protect, userController.getAllOrders);

/**
 * @swagger
 * /user/updateCart:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Updates the item's quantity in cart
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCart'
 *     responses:
 *       201:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/updateCart')
    .post(authenticationController.protect, userController.updateCart);

/**
 * @swagger
 * /user/deleteItem:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Updates the item's quantity in cart
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteItem'
 *     responses:
 *       201:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/deleteItem')
    .post(authenticationController.protect, userController.deleteItemFromCart)

/**
 * @swagger
 * /user/clearCart:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Clears the cart for logged-in user
 *     tags: [User]
 *     responses:
 *       201:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/clearCart')
    .post(authenticationController.protect, userController.clearCart);

/**
 * @swagger
 * /user/getItemDetailsInCart:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all items in cart
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsInCart'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/getItemDetailsInCart')
    .get(authenticationController.protect, userController.getItemDetailsInCart);

/**
 * @swagger
 * /user/updateWishlist:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Updates the user's wishlist
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWishlist'
 *     responses:
 *       201:
 *         description: Item added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/updateWishlist')
    .post(authenticationController.protect, userController.updateWishlist);

/**
 * @swagger
 * /user/deleteItemWishlist:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Updates the item's quantity in cart
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteItemFromWishlist'
 *     responses:
 *       201:
 *         description: Item deleted from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/deleteItemWishlist')
    .post(authenticationController.protect, userController.deleteItemFromWishlist)

/**
 * @swagger
 * /user/clearWishlist:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Clears the wishlist for logged-in user
 *     tags: [User]
 *     responses:
 *       201:
 *         description: Wishlist cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithToken'
 *       500:
 *         description: Bad Credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/clearWishlist')
    .post(authenticationController.protect, userController.clearWishlist);

/**
 * @swagger
 * /user/getItemDetailsInWishlist:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all items in cart
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsInWishlist'
 *       500:
 *         description: Bad Credentials / Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 */
router.route('/getItemDetailsInWishlist')
    .get(authenticationController.protect, userController.getItemDetailsInWishlist);

module.exports = router;