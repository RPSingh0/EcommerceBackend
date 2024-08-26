/**
 * @swagger
 * components:
 *   schemas:
 *     AllProducts:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of products
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
 *                   description:
 *                     type: string
 *                     description: The description / summary about the product
 *                   price:
 *                     type: integer
 *                     description: The price of the product
 *                   brand:
 *                     type: string
 *                     description: The brand of the product
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for product
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The product highlights
 *                   averageRating:
 *                     type: integer
 *                     description: The average rating for this product
 *                   numRatings:
 *                     type: integer
 *                     description: The number of ratings for this product
 *                   productImages:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The image url for product images
 *     ProductById:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of products
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
 *                   description:
 *                     type: string
 *                     description: The description / summary about the product
 *                   price:
 *                     type: integer
 *                     description: The price of the product
 *                   brand:
 *                     type: string
 *                     description: The brand of the product
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for product
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The product highlights
 *                   averageRating:
 *                     type: integer
 *                     description: The average rating for this product
 *                   numRatings:
 *                     type: integer
 *                     description: The number of ratings for this product
 *                   productImages:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The image url for product images
 *                   parentCategory:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The parent category reference id
 *                   subCategory:
 *                     type: string
 *                     description: The reference to sub category
 *     ProductByParentCategory:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of products
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
 *                   description:
 *                     type: string
 *                     description: The description / summary about the product
 *                   price:
 *                     type: integer
 *                     description: The price of the product
 *                   brand:
 *                     type: string
 *                     description: The brand of the product
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for product
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The product highlights
 *                   averageRating:
 *                     type: integer
 *                     description: The average rating for this product
 *                   numRatings:
 *                     type: integer
 *                     description: The number of ratings for this product
 *                   productImages:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The image url for product images
 *     ProductBySubCategory:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         results:
 *           type: integer
 *           description: The number of products
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
 *                   description:
 *                     type: string
 *                     description: The description / summary about the product
 *                   price:
 *                     type: integer
 *                     description: The price of the product
 *                   coverImage:
 *                     type: string
 *                     description: The cover image url for product
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The product highlights
 *                   averageRating:
 *                     type: integer
 *                     description: The average rating for this product
 *                   numRatings:
 *                     type: integer
 *                     description: The number of ratings for this product
 *     CreateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description / summary about the product
 *         price:
 *           type: integer
 *           description: The price of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         coverImage:
 *           type: string
 *           description: The cover image url for product
 *         keywords:
 *           type: array
 *           items:
 *             type: string
 *             description: The product highlights
 *         productImages:
 *           type: array
 *           items:
 *             type: string
 *             description: The image url for product images
 *         parentCategory:
 *           type: array
 *           items:
 *             type: string
 *             description: The parent category reference id
 *         subCategory:
 *           type: string
 *           description: The reference to sub category
 *     CreateProductSuccess:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status for the request
 *         data:
 *           type: object
 *           properties:
 *             product:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The reference to product created
 *                 name:
 *                   type: string
 *                   description: The name of the product
 *                 description:
 *                   type: string
 *                   description: The description / summary about the product
 *                 price:
 *                   type: integer
 *                   description: The price of the product
 *                 brand:
 *                   type: string
 *                   description: The brand of the product
 *                 coverImage:
 *                   type: string
 *                   description: The cover image url for product
 *                 keywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: The product highlights
 *                 productImages:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: The image url for product images
 *                 parentCategory:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: The parent category reference id
 *                 subCategory:
 *                   type: string
 *                   description: The reference to sub category
 *                 averageRating:
 *                   type: integer
 *                   description: The average rating for this product
 *                 numRatings:
 *                   type: integer
 *                   description: The number of ratings for the product
 */