const User = require('../models/user')

const ErrorHandler = require ('../utils/errorHandler');
const catchAsyncErrors = require ('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) =>  {

    const {name, email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '1JLhF36PB7mHGWoV6iD7gLk4daLVeO1C4/view?usp=sharing',
            url:'https://drive.google.com/file/d/1JLhF36PB7mHGWoV6iD7gLk4daLVeO1C4/view?usp=sharing'
        }
    })

    sendToken(user, 200, res)

})

//Login user => /api/v1/login
exports.loginUser = catchAsyncErrors (async (req, res, next) => {
    const { email, password } = req.body;


    // checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //checks if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
})

//logout user => /api/v1/logout

exports.logoutUser = catchAsyncErrors (async (req, res, next) =>  {
    res.cookie('token', null, 
    { expires: new Date(Date.now()),
    httpOnly: true })

    res.status(200).json({
        success: true,
        message: 'User logged out'
    })
})