const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    subjectId:{type:mongoose.Types.ObjectId,ref:"Subject"},
    studentId:{type:mongoose.Types.ObjectId,ref:"Student"},
    date:{type:Date},
    present:{type:Boolean,default:false}
});
module.exports = mongoose.model('sAttendance',attendanceSchema)