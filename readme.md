# Technologies Used

The backend project leverages several technologies to power its functionality:

1. **Node.js**: The project is built on Node.js, a JavaScript runtime that allows server-side execution of JavaScript code.

2. **Express**: Express is used as the web framework for Node.js, providing a robust set of features for building web applications and APIs.

3. **MongoDB**: MongoDB serves as the database for storing and managing data. Its flexibility as a NoSQL database makes it suitable for handling various types of data structures.

4. **JWT Token-Based Authentication**: JSON Web Tokens (JWT) are used for authentication, providing secure access to API endpoints. This approach allows for stateless authentication and authorization.

5. **Controllers**: The project includes various controllers such as `productController`, `reviewController`, `subCategoryController`, `parentCategoryController`, and `authenticationController`. These controllers handle different aspects of the application logic, such as CRUD operations for products, reviews, subcategories, parent categories, and user authentication.

# User Schema and Endpoints
---
### Schema
The User schema defines the structure for user-related data in the application. Below are the fields and their types:

- `firstName`: String (Required) - The user's first name.
- `lastName`: String - The user's last name.
- `email`: String (Required) - The user's email address.
- `password`: String (Required, Min length: 8) - The user's password.
- `passwordConfirm`: String (Required) - Confirmation of the user's password.
- `mobile`: String (Required) - The user's mobile number.
- `address`: String (Required) - The user's address.
- `userImage`: String - URL to the user's profile image.
- `cart`: Array of Objects - The user's shopping cart containing:
  - `_id`: false (No MongoDB ObjectId) - Cart item identifier.
  - `identifier`: String (Required) - Identifier for the cart item.
  - `quantity`: Number (Required, Min: 1) - Quantity of the cart item.
- `wishlist`: Array of Objects - The user's wishlist containing:
  - `_id`: false (No MongoDB ObjectId) - Wishlist item identifier.
  - `identifier`: String (Required) - Identifier for the wishlist item.
- `currentCartPrice`: Number - Current total price of items in the cart.
- `previousOrders`: Array of Objects - Details of previous orders containing:
  - `_id`: false (No MongoDB ObjectId) - Order item identifier.
  - `transactionId`: String (Required) - Transaction ID for the order.
  - `identifier`: String (Required) - Identifier for the ordered item.
  - `quantity`: Number (Required, Min: 1) - Quantity of the ordered item.
  - `purchasedOn`: Date - Date when the order was purchased.
- `createdOn`: Date - Date when the user account was created (Default: Current date).
- `passwordChangedAt`: Date - Date when the password was last changed.
- `passwordResetToken`: String - Token for resetting the password.
- `passwordResetExpires`: Date - Expiry date for the password reset token.

Note: The `false` option for `_id` in subdocuments indicates that these subdocuments do not have their own MongoDB ObjectId.


### Endpoints
All endpoints are under `/api/v1/user`.

| Endpoint                       | Method | Description                                  | Controller                                                                    |
| ------------------------------ | ------ | -------------------------------------------- | ----------------------------------------------------------------------------- |
| `/signup`                      | POST   | User registration/signup.                    | `authenticationController.signup`                                             |
| `/login`                       | POST   | User login with credentials.                 | `authenticationController.login`                                              |
| `/login/byToken`               | POST   | User login using a token.                    | `authenticationController.loginWithToken`                                     |
| `/forgotPassword`              | POST   | Request to reset forgotten password.         | `authenticationController.forgotPassword`                                     |
| `/resetPassword/:token`        | POST   | Reset user password using a token.           | `authenticationController.resetPassword`                                      |
| `/updatePassword`              | POST   | Update user password.                        | `authenticationController.protect`, `authenticationController.updatePassword` |
| `/updateMe`                    | PATCH  | Update user profile.                         | `authenticationController.protect`, `authenticationController.updateUser`     |
| `/purchaseCart/:transactionId` | GET    | Purchase items in the user's cart.           | `authenticationController.protect`, `userController.purchaseCart`             |
| `/order/:orderId`              | GET    | Get order details by order ID.               | `authenticationController.protect`, `userController.getOrderByOrderId`        |
| `/getAllOrders`                | GET    | Get all orders for the user.                 | `authenticationController.protect`, `userController.getAllOrdersForReview`    |
| `/getAllOrdersForReview`       | GET    | Get all orders for review.                   | `authenticationController.protect`, `userController.getAllOrdersForReview`    |
| `/updateCart`                  | POST   | Update items in the user's cart.             | `authenticationController.protect`, `userController.updateCart`               |
| `/deleteItem`                  | POST   | Delete an item from the user's cart.         | `authenticationController.protect`, `userController.deleteItemFromCart`       |
| `/clearCart`                   | POST   | Clear all items from the user's cart.        | `authenticationController.protect`, `userController.clearCart`                |
| `/getItemDetailsInCart`        | GET    | Get details of items in the user's cart.     | `authenticationController.protect`, `userController.getItemDetailsInCart`     |
| `/updateWishlist`              | POST   | Update items in the user's wishlist.         | `authenticationController.protect`, `userController.updateWishlist`           |
| `/deleteItemWishlist`          | POST   | Delete an item from the user's wishlist.     | `authenticationController.protect`, `userController.deleteItemFromWishlist`   |
| `/clearWishlist`               | POST   | Clear all items from the user's wishlist.    | `authenticationController.protect`, `userController.clearWishlist`            |
| `/getItemDetailsInWishlist`    | GET    | Get details of items in the user's wishlist. | `authenticationController.protect`, `userController.getItemDetailsInWishlist` |

# Product Schema and Endpoints
---
### Schema
The Product schema defines the structure for product-related data in the application. Below are the fields and their types:

- `name`: String (Required) - The product's name.
- `description`: String (Required) - Description of the product.
- `keywords`: Array of Strings (Required, Max length: 5) - Highlighted keywords for the product. Each keyword must be between 3 and 60 characters long.
- `price`: Number (Required) - The product's price.
- `brand`: String (Required) - The brand of the product.
- `averageRating`: Number - Average rating of the product (Range: 1.0 to 5.0, Default: 0).
- `numRatings`: Number - Number of ratings received by the product (Default: 0).
- `coverImage`: String (Required) - URL of the product's cover image.
- `productImages`: Array of Strings (Required) - URLs of product images.
- `parentCategory`: Array of ObjectIds (Required) - Parent category IDs associated with the product.
- `subCategory`: ObjectId (Required) - Subcategory ID associated with the product.
- `createdOn`: Date - Date when the product was created (Default: Current date).

### Endpoints

All endpoints are under `/api/v1/product`.

| Endpoint                      | Method | Description                          | Controller                                        |
| ----------------------------- | ------ | ------------------------------------ | ------------------------------------------------- |
| `/all`                        | GET    | Get all products.                    | `productController.getAllProduct`                 |
| `/byId/:productId`            | GET    | Get product by ID.                   | `productController.getProductById`                |
| `/byParentCategory/:category` | GET    | Get all products by parent category. | `productController.getAllProductByParentCategory` |
| `/bySubCategory/:category`    | GET    | Get all products by subcategory.     | `productController.getAllProductBySubCategory`    |
| `/create`                     | POST   | Create a new product.                | `productController.createProduct`                 |
| `/delete/:productId`          | DELETE | Delete a product by ID.              | `productController.deleteProduct`                 |


# Review Schema and Endpoints
---
### Schema
The Review schema defines the structure for review-related data in the application. Below are the fields and their types:

- `productId`: ObjectId (Required) - The ID of the product associated with the review.
- `user`: ObjectId (Required) - The ID of the user who submitted the review.
- `review`: String (Required) - The review content.
- `rating`: Number (Required, Range: 1 to 5) - The rating given in the review.


### Endpoints

All endpoints are under `/api/v1/review`.

| Endpoint          | Method | Description                | Controller                                                          |
| ----------------- | ------ | -------------------------- | ------------------------------------------------------------------- |
| `/get/:productId` | GET    | Get reviews by product ID. | `reviewController.getReviewByProduct`                               |
| `/create`         | POST   | Create a new review.       | `authenticationController.protect`, `reviewController.createReview` |
| `/update`         | PATCH  | Update an existing review. | `authenticationController.protect`, `reviewController.updateReview` |
| `/delete`         | POST   | Delete a review.           | `authenticationController.protect`, `reviewController.deleteReview` |

# SubCategory Schema and Endpoints
---
### Schema
The Sub Category schema defines the structure for subcategory-related data in the application. Below are the fields and their types:

- `name`: String (Required) - The name of the subcategory.
- `coverImage`: String (Required) - URL of the cover image for the subcategory.
- `parentCategory`: Array of ObjectIds - Parent category IDs associated with the subcategory.
- `createdOn`: Date - Date when the subcategory was created (Default: Current date).

### Endpoints

All endpoints are under `/api/v1/subCategory`.

| Endpoint            | Method | Description                       | Controller                                |
| ------------------- | ------ | --------------------------------- | ----------------------------------------- |
| `/all`              | GET    | Get all subcategories.            | `subCategoryController.getAllSubCategory` |
| `/create`           | POST   | Create a new subcategory.         | `subCategoryController.createSubCategory` |
| `/delete/:category` | DELETE | Delete a subcategory by category. | `subCategoryController.deleteSubCategory` |

# ParentCategory Schema and Endpoints
---
### Schema
The Parent Category schema defines the structure for parent category-related data in the application. Below are the fields and their types:

- `name`: String (Required) - The name of the parent category.
- `createdOn`: Date - Date when the parent category was created (Default: Current date).

### Endpoints

All endpoints are under `/api/v1/parentCategory`.

| Endpoint            | Method | Description                             | Controller                                        |
| ------------------- | ------ | --------------------------------------- | ------------------------------------------------- |
| `/all`              | GET    | Get all parent categories.              | `parentCategoryController.getAllParentCategory`   |
| `/under/:category`  | GET    | Get all subcategories under a category. | `parentCategoryController.getAllSubCategoryUnder` |
| `/create`           | POST   | Create a new parent category.           | `parentCategoryController.createParentCategory`   |
| `/delete/:category` | DELETE | Delete a parent category by category.   | `parentCategoryController.deleteParentCategory`   |
