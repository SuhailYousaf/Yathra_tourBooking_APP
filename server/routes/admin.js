const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth=require('../middleware/auth.js')

router.post('/login', adminController.adminLogin)
router.post('/register', adminController.adminRegister)
router.post('/createtour', adminController.createTour)
router.get('/createtour', adminController.getTours)
router.get('/getUsers', adminController.getUsers)



module.exports = router;