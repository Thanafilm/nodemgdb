const express = require('express');
const app = express()
const connectDB = require('./connect/db')
const morgan = require('morgan')
const expressValidator = require('express-validator');

const cookieParser = require('cookie-parser')
// DB Connect
connectDB();

//MiddleWares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());

//Route
const AuthRouter = require("./routes/auth")
const UserRouter = require('./routes/user')
const CategoryRouter = require('./routes/category')
app.use('/api', AuthRouter)
app.use('/api', UserRouter)
app.use('/api', CategoryRouter)


app.listen(3000)