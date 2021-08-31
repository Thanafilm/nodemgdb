const express = require('express');
const app = express()
const connectDB = require('./connect/db')
const morgan = require('morgan')
const expressValidator = require('express-validator');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
// DB Connect


//MiddleWares
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());



//Route
const AuthRouter = require("./routes/auth")
const UserRouter = require('./routes/user')
const CategoryRouter = require('./routes/category')
const ProductRouter = require('./routes/product')
const BraintreeRouter = require('./routes/braintee')
const OrderROuter = require('./routes/order')
app.use('/api', AuthRouter)
app.use('/api', UserRouter)
app.use('/api', CategoryRouter)
app.use('/api', ProductRouter)
app.use('/api', BraintreeRouter)
app.use('/api', OrderROuter)
connectDB();
app.listen(4000)