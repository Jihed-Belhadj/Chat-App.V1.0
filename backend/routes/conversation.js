const express = require('express');
const { OpenOrCreateConv, getAllConvOfUser } = require('../controllers/conversationControllers');
const { authMiddleWare } = require('../middlewares/authMiddlware');
const router = express.Router();



//OPEN AN EXISTING CONVERSATION OR CREATE NEW ONE
router.post('/', authMiddleWare, OpenOrCreateConv)

//GET ALL CONVERSATIONS
router.get('/', authMiddleWare, getAllConvOfUser);



module.exports = router;