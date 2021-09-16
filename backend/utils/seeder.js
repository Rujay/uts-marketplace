const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');


const products = require('../data/products');

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products have been deleted.');

        await Product.insertMany(products);
        console.log('All products have been inserted.');
        process.exit();

    } catch (err) {
        console.error(err.message);
        process.exit();
    }
}

seedProducts();