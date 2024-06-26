const mongoose = require('mongoose');
const dotenv = require('dotenv');

/**
 * Dotevn will get access to the config.env file
 */
dotenv.config({
    path: './config.env'
});

/**
 * Initializing the root app here ->
 */
const app = require('./app');

/**
 * DB connection
 */
// const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(c => {
    console.log('Connected to our DB!')
});

/**
 * Connection port settings
 */
const port = process.env.PORT || 3000;

/**
 * Listener on the port mentioned above
 */
app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port: ${port}...`);
});