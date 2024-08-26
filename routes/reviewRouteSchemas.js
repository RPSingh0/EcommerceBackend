/**
 * @swagger
 * components:
 *   schemas:
 *     AllReviewsByProductId:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of reviews
 *         data:
 *           type: object
 *           properties:
 *             reviews:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to review
 *                   productId:
 *                     type: string
 *                     description: The reference to product
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The reference to user reviewed the product
 *                       firstName:
 *                         type: string
 *                         description: The first name of user reviewed
 *                       lastName:
 *                         type: string
 *                         description: The last name of user reviewed
 *                       userImage:
 *                         type: string
 *                         description: The user image url
 *                   review:
 *                     type: string
 *                     description: The review text
 *                   rating:
 *                     type: integer
 *                     description: The rating for review
 *     CreateReview:
 *       type: object
 *       required:
 *         - productId
 *         - rating
 *         - review
 *       properties:
 *         productId:
 *           type: string
 *           description: The reference to a product
 *         rating:
 *           type: integer
 *           description: The rating for current review
 *         review:
 *           type: string
 *           description: The review text
 *     CreateReviewSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             review:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The reference to review created
 *                 productId:
 *                   type: string
 *                   description: The reference to product reviewed
 *                 user:
 *                   type: string
 *                   description: The reference to user reviewed
 *                 review:
 *                   type: string
 *                   description: The review text
 *                 rating:
 *                   type: integer
 *                   description: The review rating
 *     UpdateReview:
 *       type: object
 *       required:
 *         - productId
 *         - rating
 *         - review
 *       properties:
 *         productId:
 *           type: string
 *           description: The reference to a product
 *         rating:
 *           type: integer
 *           description: The rating for current review
 *         review:
 *           type: string
 *           description: The review text
 *     UpdateReviewSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             review:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The reference to review created
 *                 productId:
 *                   type: string
 *                   description: The reference to product reviewed
 *                 user:
 *                   type: string
 *                   description: The reference to user reviewed
 *                 review:
 *                   type: string
 *                   description: The review text
 *                 rating:
 *                   type: integer
 *                   description: The review rating
 *     DeleteReview:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           description: The reference to a product
 */