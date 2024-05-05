const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A user must have a first name']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'A user must have an email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (element) {
                return element === this.password;
            },
            message: 'Passwords are not same'
        }
    },
    mobile: {
        type: String,
        required: [true, 'A user must have a mobile number']
    },
    address: {
        type: String,
        required: [true, 'A user must have an address']
    },
    userImage: {
        type: String
    },
    cart: [
        {
            _id: false,
            identifier: {
                type: String,
                required: [true, 'An identifier must be provided']
            },
            quantity: {
                type: Number,
                required: [true, 'A cart item must have a quantity'],
                min: [1, 'A cart item quantity should be greater then or equal to 1']
            }
        }
    ],
    wishlist: [
        {
            _id: false,
            identifier: {
                type: String,
                required: [true, 'An identifier must be provided']
            }
        }
    ],
    currentCartPrice: {
        type: Number,
        default: 0
    },
    previousOrders: [
        {
            _id: false,
            transactionId: {
                type: String,
                required: [true, 'An transaction id must be provided for a purchase']
            },
            identifier: {
                type: String,
                required: [true, 'An identifier must be provided']
            },
            quantity: {
                type: Number,
                required: [true, 'A cart item must have a quantity'],
                min: [1, 'A cart item quantity should be greater then or equal to 1']
            },
            purchasedOn: {
                type: Date
            }
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // hash the password
    this.password = await bcrypt.hash(this.password, 12);

    // removing the passwordConfirm password field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// few instances method on user
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfterJwtIssued = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const UserModel = mongoose.model('user', userSchema, 'user');
module.exports = UserModel;