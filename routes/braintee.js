const express = require('express')
const router = express.Router()

const {requireSignin,isAuth} = require('../controller/authen');
const { generateKey, payment } = require('../controller/braintee');
const { userById } = require('../controller/user');


router.get('/braintree/getToken/:userId',requireSignin,isAuth,generateKey)
router.post('/braintree/payment/:userId',requireSignin,isAuth,payment)

router.param('userId',userById)
module.exports = router;