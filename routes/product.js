const express = require('express')
const router = express.Router()

//Import Middleware
const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { userById } = require('../controller/user')

//Import Controller
const { create, productById, getproduct, deleteproduct, updateProduct, listProduct, listRelated, listCategories, listBySearch, photo } = require('../controller/product')


//Route
router.get('/product/:productById', getproduct)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/product/:productById/:userId', requireSignin, isAuth, isAdmin, updateProduct)
router.delete('/product/:productById/:userId', requireSignin, isAuth, isAdmin, deleteproduct)
router.get('/products', listProduct)
router.get('/product/related/:productById', listRelated)
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get('/product/photo/:productById', photo)
// Param Route
router.param('productById', productById)
router.param('userId', userById);
module.exports = router