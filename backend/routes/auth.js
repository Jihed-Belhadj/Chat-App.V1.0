const express = require('express');
const { addUser, getUser, getCurrent, getAllUsers } = require('../controllers/authControllers');
const { authMiddleWare } = require('../middlewares/authMiddlware');
const router = express.Router();


//REGISTER
router.post('/register', addUser)

//LOGIN
router.post('/login', getUser);

//GET ALL USERS
router.get('/users',authMiddleWare, getAllUsers)

//CURRENT USER
router.get('/current', authMiddleWare,getCurrent)

module.exports = router;