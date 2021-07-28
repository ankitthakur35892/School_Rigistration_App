const express = require('express');
const studentController = require('../controller/studentController')
const router = express.Router();
router.post('/new',studentController.newStudent);
router.post('/verify',studentController.verifyOtp);
router.post('/changePassword',studentController.changePassword);
router.post('/forgetPassword',studentController.forgetPassword);
router.get('/find',studentController.findStudent);
router.put('/update',studentController.updateStudent);
router.delete('/delete/:id',studentController.deleteStudent);
router.post('/login',studentController.login);
module.exports = router;