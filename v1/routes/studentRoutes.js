const express = require('express');
const studentController = require('../controller/studentController')
const router = express.Router();
router.post('/',studentController.newStudent);
router.post('/verify',studentController.verifyOtp);
router.post('/changePassword',studentController.changePassword);
router.post('/forgetPassword',studentController.forgetPassword);
router.get('/',studentController.findStudent);
router.put('/',studentController.updateStudent);
router.delete('/:id',studentController.deleteStudent);
router.post('/login',studentController.login);
module.exports = router;