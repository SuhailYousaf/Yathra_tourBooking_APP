const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/createtour', userController.listTours)

router.get('/getTour/:id', userController.getTour)
 

module.exports = router;

// new update