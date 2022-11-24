const express = require('express');
const { sendMessage ,allMessage} = require('../controllers/messControl');
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allMessage);

module.exports = router;