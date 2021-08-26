const express = require('express')
const router = express.Router()

//Import Controller
const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { userById } = require('../controller/user')
const { create, categoryId, getCategoryById, updateCategory, listCategory, removeCategory } = require('../controller/category')

//Route
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.get('/category/:categoryId', getCategoryById)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, removeCategory)
router.get('/categories', listCategory)

//Param Route
router.param('categoryId', categoryId)
router.param('userId', userById);
module.exports = router;