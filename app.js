const express = require('express')
const cors = require('cors');
const parentCategoryRouter = require('./routes/parentCategoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const reviewRouter = require('./routes/reviewRoutes');
const globalErrorHandler = require('./utils/errorHandler');

/**
 * The main entrypoint `app` variable for application
 */
const app = express();

app.use(cors());

app.post('/webhookCheckout', express.raw({type: 'application/json'}), userController.webhookCheckout);

app.use(express.json())

// app.use( ( req, res, next ) => {
//     setTimeout(next, 2000 );
// });

app.use('/api/v1/parentCategory', parentCategoryRouter);
app.use('/api/v1/subCategory', subCategoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);

app.use("*", (req, res, next) => {
    next(new Error(`Can't find: ${req.originalUrl} on this server!`));
})

app.use(globalErrorHandler);

module.exports = app;