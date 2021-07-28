const express = require('express');
const teacherController = require('../controller/teacherController')
const router = express.Router();

router.post('/',teacherController.addTeacher);
router.post('/verify',teacherController.verifyOtp);
router.post('/changePassword',teacherController.changePassword);
router.post('/forgetPassword',teacherController.forgetPassword);
router.get('/',teacherController.findTeacher);
router.put('/',teacherController.updateTeacher);
router.delete('/:id',teacherController.deleteTeacher);
router.post('/login',teacherController.login);

module.exports = router;