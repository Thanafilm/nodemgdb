
const express = require('express')
const router = express.Router()

const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { create, OrderHistory, StockUpdate, listOrder, getOrderStatus, orderById, updateOrderStatus, purchaseHistory } = require('../controller/order')
const { userById } = require('../controller/user')

//Route 
router.post('/order/create/:userId',requireSignin,isAuth,StockUpdate,OrderHistory,create)
router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrder)
router.get('/order/status/:userId',requireSignin,isAuth,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",requireSignin,isAuth,isAdmin,updateOrderStatus)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

//RouteParam
router.param('orderId',orderById)
router.param('userId', userById);

module.exports = router;