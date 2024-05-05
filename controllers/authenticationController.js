const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const {promisify} = require('util');

const signToken = function (id) {
    return jwt.sign({id: id}, process.env.JWT_SECRETE_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    });
}

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user: user
        }
    });
};

exports.updateUser = catchAsync(async (req, res, next) => {

    const {firstName, lastName, email, address, mobile} = req.body;

    if (!firstName && !lastName && !email && !address && !mobile) {
        throw new Error("Please provide at least one value to update");
    }

    const update = {}

    if (firstName) {
        update.firstName = firstName;
    }

    if (lastName) {
        update.lastName = lastName;
    }

    if (address) {
        update.address = address;
    }

    if (mobile) {
        update.mobile = mobile;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, update, {
        new: true,
        runValidators: true
    });

    createAndSendToken(updatedUser, 201, res);
});

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        mobile: req.body.mobile,
        address: req.body.address,
        userImage: req.body.userImage,
        passwordChangedAt: Date.now()
    });

    createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    // find the user in the database
    const user = await User.findOne({email: email});

    // if there is no user or the password is not correct
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect email or password')
    }

    createAndSendToken(user, 200, res);
});

exports.loginWithToken = catchAsync(async (req, res, next) => {
    let token;
    const {email} = req.body;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!email || !token) {
        throw new Error('Please provide email and token');
    }

    // if there's a token, we need to validate the content and the user
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE_KEY);

    // After the token is verified, we need to check if user still exists or not, if not, throw an error
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        throw new Error('The user belonging to this token no longer exists, please login again!');
    }

    // If user exists, we need to check if he changed the password after the token is issued
    if (currentUser.changedPasswordAfterJwtIssued(decoded.iat)) {
        throw new Error('User recently changed password! Please log in again');
    }

    if (currentUser.email !== email) {
        throw new Error('Wrong email or token');
    }

    createAndSendToken(currentUser, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    // if there's no authorization header or no token
    if (!token) {
        throw new Error('You are not logged in! Please log in to get access');
    }

    // if there's a token, we need to validate the content and the user
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE_KEY);

    // After the token is verified, we need to check if user still exists or not, if not, throw an error
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        throw new Error('The user belonging to this token no longer exists, please login again!');
    }

    // If user exists, we need to check if he changed the password after the token is issued
    if (currentUser.changedPasswordAfterJwtIssued(decoded.iat)) {
        throw new Error('User recently changed password! Please log in again');
    }

    // grant access and put the user object on the request :)
    req.user = currentUser;
    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // get the user based on email
    const user = await User.findOne({email: req.body.email});

    // if there is no user
    if (!user) {
        throw new Error('There is no user with that email address');
    }

    // if there is a user, generate a reset token and send it back
    const resetToken = user.createPasswordResetToken();

    // save the token in db, for validating later with the reset token
    await user.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`;

    res.status(200).json({
        status: 'success',
        data: {
            resetURL: resetURL
        }
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // get the user based on the hashed token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    });

    // if there is no user or the password reset token is expired ask to login or reset password again
    if (!user) {
        throw new Error('Token is invalid or expired');
    }

    // else, update the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {

    if (!req.body.passwordCurrent || !req.body.password || !req.body.passwordConfirm) {
        throw new Error('Please provide current password and new passwords!');
    }

    // get the user information
    const user = await User.findById(req.user.id);

    // check if the POSTed current password is correct or not
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        throw new Error('Your current password is wrong');
    }

    // if the POSTed current password is correct, proceed to update the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // this will verify the password and passwordConfirm and then hash the password and save it.
    await user.save();

    // create and send the token
    createAndSendToken(user, 200, res);
});