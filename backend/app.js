const express = require("express");
const app= express();

app.use(express.json());

//imported error middleware
const errorMiddleware = require('./middlewares/error')

//imported routes
const products = require("./routes/product")



app.use('/api/v1', products);

//middleware to handle errors
app.use(errorMiddleware)

module.exports = app; 