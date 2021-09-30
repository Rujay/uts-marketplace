const express = require("express");
const app= express();

const cookieParser = require('cookie-parser')

//imported error middleware
const errorMiddleware = require('./middlewares/error')

app.use(express.json());
app.use(cookieParser())

//imported routes
const products = require("./routes/product")
const auth = require("./routes/auth")


app.use('/api/v1', products);
app.use('/api/v1', auth);

//middleware to handle errors
app.use(errorMiddleware)

module.exports = app; 