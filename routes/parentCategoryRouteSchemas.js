/**
 * @swagger
 * components:
 *   schemas:
 *     AllParentCategory:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of results returned
 *         data:
 *           type: object
 *           properties:
 *             parentCategories:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to parent category
 *                   name:
 *                     type: string
 *                     description: The name of parent category
 *                   createdOn:
 *                     type: string
 *                     format: date-time
 *                     description: The time of category creation
 *     SubCategoriesUnderParentCategory:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of results returned
 *         data:
 *           type: object
 *           properties:
 *             subCategories:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of parent category
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for subcategory
 *     CreateParentCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of parent category to create
 *     CreateParentCategorySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             parentCategory:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to parent category created
 *                   name:
 *                     type: string
 *                     description: The name of parent category
 */