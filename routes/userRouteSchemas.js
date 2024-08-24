/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *         - passwordConfirm
 *         - mobile
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of user
 *         passwordConfirm:
 *           type: string
 *           description: The password of user, used to confirm password
 *         mobile:
 *           type: string
 *           description: The mobile number of the user
 *         address:
 *           type: string
 *           description: The home/delivery address of the user
 *         userImage:
 *           type: string
 *           description: The image url for user
 *         cart:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: The identifier, can be a reference to a product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *         wishlist:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: The identifier, can be a reference to a product
 *         currentCartPrice:
 *           type: integer
 *           description: The current price of the cart for user
 *         previousOrders:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: string
 *                 description: The transaction id for the purchase
 *               identifier:
 *                 type: string
 *                 description: The identifier, can be a reference to a product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product purchased
 *               purchasedOn:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of transaction
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: The time of account creation by user
 *         passwordChangedAt:
 *           type: string
 *           format: date-time
 *           description: The time at which the password was changed
 *         passwordResetToken:
 *           type: string
 *           description: The password reset token issued to user in case of password reset request
 *         passwordResetExpires:
 *           type: string
 *           format: date-time
 *           description: The password reset token expiration time
 *     UserSignup:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *         - passwordConfirm
 *         - mobile
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of user
 *         passwordConfirm:
 *           type: string
 *           description: The password of user, used to confirm password
 *         mobile:
 *           type: string
 *           description: The mobile number of the user
 *         address:
 *           type: string
 *           description: The home/delivery address of the user
 *     UserWithToken:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for request
 *         token:
 *           type: string
 *           description: The signed jwt token for user
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The mongodb object id reference
 *                 firstName:
 *                   type: string
 *                   description: The first name of the user
 *                 lastName:
 *                   type: string
 *                   description: The last name of the user
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *                 mobile:
 *                   type: string
 *                   description: The mobile number of the user
 *                 address:
 *                   type: string
 *                   description: The home/delivery address of the user
 *                 userImage:
 *                   type: string
 *                   description: The image url for user
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       identifier:
 *                         type: string
 *                         description: The identifier, can be a reference to a product
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       identifier:
 *                         type: string
 *                         description: The identifier, can be a reference to a product
 *                 currentCartPrice:
 *                   type: integer
 *                   description: The current price of the cart for user
 *                 previousOrders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       transactionId:
 *                         type: string
 *                         description: The transaction id for the purchase
 *                       identifier:
 *                         type: string
 *                         description: The identifier, can be a reference to a product
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product purchased
 *                       purchasedOn:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time of transaction
 *                 createdOn:
 *                   type: string
 *                   format: date-time
 *                   description: The time of account creation by user
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *     UserLoginByToken:
 *       type: object
 *       required:
 *        - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email for user login
 *     UserForgotPassword:
 *       type: object
 *       required:
 *        - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email for user login
 *     UserLoginByTokenSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for request
 *         data:
 *           type: object
 *           properties:
 *             resetURL:
 *               type: string
 *               description: The reset url link
 *     UserPasswordReset:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The password for user login
 *         passwordConfirm:
 *           type: string
 *           description: The password confirmation for user login
 *     UserPasswordUpdate:
 *       type: object
 *       properties:
 *         passwordCurrent:
 *           type: string
 *           description: The current password for user
 *         password:
 *           type: string
 *           description: The password for user login
 *         passwordConfirm:
 *           type: string
 *           description: The password confirmation for user login
 *     UpdateMe:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         mobile:
 *           type: string
 *           description: The mobile number of the user
 *         address:
 *           type: string
 *           description: The home/delivery address of the user
 *     PurchaseCartResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request
 *         payAt:
 *           type: string
 *           description: The stripe integrated payment url
 */