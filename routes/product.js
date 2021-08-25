const express = require('express')
const router = express.Router()

//Import Middleware
const {isAdmin,requireSignin,isAuth} = require('../controller/authen')
const {userById} = require('../controller/user')

//Import Controller
const {create} = require('../controller/product')


//Route
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create)

router.param('userId', userById);
module.exports = router