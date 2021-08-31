
const express = require('express')
const router = express.Router()

const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { create, OrderHistory } = require('../controller/order')
const { userById } = require('../controller/user')

//Route 
router.post('/order/create/:userId',requireSignin,isAuth,OrderHistory,create)
router.get
// Param Route
// router.param('productById', productById)
router.param('userId', userById);

module.exports = router;