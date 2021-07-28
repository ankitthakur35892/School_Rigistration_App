const attendanceController = require('../controller/tAttendanceController');
const express = require('express');
const router = express.Router();
router.post('/new',attendanceController.createAttendance);
router.get('/find',attendanceController.findAttendance);
router.put('/update',attendanceController.updateAttendance);
router.delete('/delete/:id',attendanceController.deleteAttendance);

module.exports = router;