const User = require ('../models/user')

const catchAsyncErrors = require ('../middlewares/catchAsyncErrors')
const ErrorHandler = require ('../utils/errorHandler')
const jwt = require ('jsonwebtoken')

// Checks if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors (async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Unauthenticated user. Login to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)

    next()

})
