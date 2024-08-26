/**
 * @swagger
 * components:
 *   schemas:
 *     AllSubCategory:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             subCategories:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to sub category
 *                   name:
 *                     type: string
 *                     description: The name of sub category
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for sub category
 *                   createdOn:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date time for sub category
 *                   parentCategory:
 *                     type: array
 *                     items:
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name for parent category for this sub category
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
 *     CreateSubCategory:
 *       type: object
 *       required:
 *         - name
 *         - coverImage
 *         - parentCategory
 *       properties:
 *         name:
 *           type: string
 *           description: The name of parent category to create
 *         coverImage:
 *           type: string
 *           description: The cover image url for sub category
 *         parentCategory:
 *           type: array
 *           items:
 *             type: string
 *             description: The parent category reference
 *     CreateSubCategorySuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             subCategory:
 *               type: array
 *               items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The reference to parent category created
 *                   name:
 *                     type: string
 *                     description: The name of parent category
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url
 *                   parentCategory:
 *                     type: array
 *                     items:
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of parent category
 */