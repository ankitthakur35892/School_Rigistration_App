const express = require('express');
const teacherController = require('../controller/teacherController')
const router = express.Router();

router.post('/new',teacherController.addTeacher);
router.post('/verify',teacherController.verifyOtp);
router.post('/changePassword',teacherController.changePassword);
router.post('/forgetPassword',teacherController.forgetPassword);
router.get('/find',teacherController.findTeacher);
router.put('/update',teacherController.updateTeacher);
router.delete('/delete',teacherController.deleteTeacher);
router.post('/login',teacherController.login);

module.exports = router;