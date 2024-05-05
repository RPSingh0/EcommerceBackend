const parseValidationError = err => {
    const errors = Object.values(err.errors).map(element => element.message);

    return `Invalid input data. ${errors.join('. ')}`;
}

const sendBadRequestError = (error, res) => {
    return res.status(400).json({
        status: 'error',
        message: error
    });
}

const sendInternalServerError = (error, res) => {
    return res.status(500).json({
        status: 'fail',
        message: error
    })
}

module.exports = (err, req, res, next) => {

    let error = err.message;
    console.log(err);

    if (err.name === 'ValidationError') {
        error = parseValidationError(err)
        return sendBadRequestError(error, res);
    }

    return sendInternalServerError(error, res);
}