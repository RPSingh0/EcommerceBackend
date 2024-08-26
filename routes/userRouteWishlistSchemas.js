/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateWishlist:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: The reference to product
 *     DeleteItemFromWishlist:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: The reference to product
 *     ItemsInWishlist:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to product
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   price:
 *                     type: integer
 *                     description: The price for each product
 *                   coverImage:
 *                     type: string
 *                     description: The image url for product's cover image
 *                   averageRating:
 *                     type: integer
 *                     description: The average rating for the product
 */