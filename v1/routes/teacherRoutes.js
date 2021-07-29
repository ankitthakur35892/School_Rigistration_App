const express = require('express');
const teacherController = require('../controller/teacherController');
const middleware = require('../../utility/verifyToken');
const router = express.Router();
router.post('/',              teacherController.addTeacher);
router.post('/verify',        teacherController.verifyOtp);
router.post('/login',         teacherController.login);
router.post('/changePassword',middleware.verifyToken,teacherController.changePassword);
router.post('/forgetPassword',teacherController.forgetPassword);
router.get('/',               middleware.verifyToken,teacherController.findTeacher);
router.put('/',               middleware.verifyToken,teacherController.updateTeacher);
router.delete('/:id',         middleware.verifyToken,teacherController.deleteTeacher);

module.exports = router;

