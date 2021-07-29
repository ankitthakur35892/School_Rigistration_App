const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    examId:{type:mongoose.Types.ObjectId,ref:'Exam'},
    studentId:{type:mongoose.Types.ObjectId,ref:'Student'},
    isStudentPresent:{type:Boolean,default:false},
    teacherId:{type:mongoose.Types.ObjectId,ref:'Teacher'}
});
module.exports = mongoose.model('Eattendance',attendanceSchema);