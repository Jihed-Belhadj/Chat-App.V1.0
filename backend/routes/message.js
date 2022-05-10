const express = require('express');
const router = express.Router();
const { getAllMessages, sendNewMessage } = require('../controllers/messageControllers');
const { authMiddleWare } = require('../middlewares/authMiddlware');

// SENDING NEW MESSAGE
router.post('/', authMiddleWare, sendNewMessage)

//GETTING ALL MESSAGES FROM A CONVERSATION
router.get('/:conversationId', authMiddleWare, getAllMessages)


module.exports = router;