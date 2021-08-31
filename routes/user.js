const express = require('express')
const router = express.Router()

const { isAdmin, requireSignin, isAuth } = require('../controller/authen')
const { userById, read, update } = require('../controller/user')


router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/user/:userId', requireSignin, isAuth, read)

router.param('userId', userById);
module.exports = router;