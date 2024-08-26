/**
 * @swagger
 * components:
 *   schemas:
 *     OrderById:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of the request
 *         order:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The order quantity
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: integer
 *                 description: The price of each item
 *               total:
 *                 type: integer
 *                 description: The total price (quantity * price-per-item)
 *         total:
 *           type: integer
 *           description: The total price for this order
 *     AllOrders:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of the request
 *         data:
 *           type: object
 *           properties:
 *             orderDetails:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   totalQuantity:
 *                     type: integer
 *                     description: Total items purchased
 *                   totalPurchase:
 *                     type: integer
 *                     description: Total price for the order
 *                   itemDetails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           description: The product reference ID
 *                         productName:
 *                           type: string
 *                           description: The product name
 *                         productImage:
 *                           type: string
 *                           description: The product image URL
 *                         productPrice:
 *                           type: integer
 *                           description: The price of each item
 *                         quantity:
 *                           type: integer
 *                           description: The number of items purchased
 *                   purchasedOn:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the order
 *                   transactionId:
 *                     type: string
 *                     format: uuid
 *                     description: The unique transaction ID assigned to the order
 */
