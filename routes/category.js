const express = require('express')
const router = express.Router()

//Import Controller
const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { userById } = require('../controller/user')
const { create } = require('../controller/category')

//Route
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)

router.param('userId', userById);
module.exports = router;