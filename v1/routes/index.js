const express = require('express');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const principalRoutes = require('./principalRoutes')
const classRoutes = require('./classRoutes');
const subjectRoutes = require('./subjectRoutes');
const sAttendanceRoutes = require('./sAttendanceRoutes');
const tAttendanceRoutes = require('./tAttendanceRoutes');
const examRoutes = require('../routes/examRoutes');
const router = express()
router.use('/student',studentRoutes);
router.use('/teacher',teacherRoutes);
router.use('/principal',principalRoutes);
router.use('/class',classRoutes);
router.use('/subject',subjectRoutes);
router.use('/sAttendance',sAttendanceRoutes);
router.use('/tAttendance',tAttendanceRoutes);
router.use('/exam',examRoutes);
module.exports = router;