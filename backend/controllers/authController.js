const User = require('../models/user')

const ErrorHandler = require ('../utils/errorHandler');
const catchAsyncErrors = require ('../middlewares/catchAsyncErrors')

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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })

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

    const token = user.getJwtToken();
    
    res.status(200).json({
        success: true,
        token
    })
})