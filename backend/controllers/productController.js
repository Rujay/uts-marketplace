const Product = require('../models/product');

//error handler middleware
const ErrorHandler = require('../utils/ErrorHandler')

//Async error handler
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//API Features
const APIFeatures = require('../utils/APIFeatures')

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors ( async (req, res, next) => {
    
    const resPerPage = 2;

    const productCount = await Product.countDocuments()
    
    const apifeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apifeatures.query;


    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
})

// Get single product details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors ( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    } 
    res.status(200).json({
        success: true,
        product
    })
})

// Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    } 

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    } 

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product was deleted."
    })
})