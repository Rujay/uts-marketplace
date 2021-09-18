const app = require('./app');
const connectDatabase = require('./config/database');



const dotenv = require('dotenv');

// Setting up the config file
dotenv.config({ path: 'backend/config/config.env' });


//connect to mongodb database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

//handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})