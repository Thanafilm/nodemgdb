const express = require('express')
const router =express.Router()

const {isAdmin,requireSignin,isAuth} = require('../controller/authen')
const {userById} = require('../controller/user')
router.get('/secret/:userId', requireSignin,isAuth,isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.param('userId', userById);
module.exports = router;