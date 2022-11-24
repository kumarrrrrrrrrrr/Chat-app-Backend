var express = require('express');
var router = express.Router();
const {registerUser,authUser,allUser}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware')

router.route('/').post(registerUser).get(protect,allUser)
router.post('/login',authUser)

module.exports = router;
