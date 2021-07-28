const express = require('express');
const attendanceController = require('../controller/sAttendanceController')
const router = express.Router();
router.post('/',attendanceController.createAttendance);
router.get('/',attendanceController.findAttendance);
router.put('/',attendanceController.updateAttendance);
router.delete('/:id',attendanceController.deleteAttendance);

module.exports  = router;