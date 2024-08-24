/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateCart:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: The reference to product
 *         quantity:
 *           type: integer
 *           description: The quantity (updated) of the product
 *     DeleteItem:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: The reference to product
 *     ItemsInCart:
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
 */