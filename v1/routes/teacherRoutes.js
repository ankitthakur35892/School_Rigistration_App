const express = require('express');
const teacherController = require('../controller/teacherController');
const middleware = require('../../utility/verifyToken');
const router = express.Router();
router.post('/',teacherController.addTeacher);
router.post('/verify',teacherController.verifyOtp);
router.post('/changePassword',middleware.verifyToken,teacherController.changePassword);
router.post('/forgetPassword',middleware.verifyToken,teacherController.forgetPassword);
router.get('/',teacherController.findTeacher);
router.put('/',teacherController.updateTeacher);
router.delete('/:id',teacherController.deleteTeacher);
router.post('/login',teacherController.login);

module.exports = router;

