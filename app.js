const express = require('express')
const cors = require('cors');
const parentCategoryRouter = require('./routes/parentCategoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const reviewRouter = require('./routes/reviewRoutes');
const globalErrorHandler = require('./utils/errorHandler');
const swaggerUi = require('swagger-ui-express');
const specs = require("./swaggerInit");
const morgan = require('morgan');

/**
 * The main entrypoint `app` variable for application
 */
const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the request origin is in the allowed origins array
        if (process.env.CORS_ORIGIN.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

morgan.token('fullUrl', function (req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
});

app.use(morgan(':method :fullUrl :status :res[content-length] - :response-time ms'))
app.post('/webhookCheckout', express.raw({type: 'application/json'}), userController.webhookCheckout);

app.use(express.json())

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