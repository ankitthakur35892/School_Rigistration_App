const attendanceController = require('../controller/tAttendanceController');
const express = require('express');
const router = express.Router();
router.post('/',attendanceController.createAttendance);
router.get('/',attendanceController.findAttendance);
router.put('/',attendanceController.updateAttendance);
router.delete('/:id',attendanceController.deleteAttendance);

module.exports = router;