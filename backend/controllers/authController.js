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

    res.status(201).json({
        success: true,
        user
    })

})