const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    teacherId:{type:mongoose.Types.ObjectId,ref:'Teacher'},
    date:{type:Date},
    present:{type:Boolean}
});
module.exports = mongoose.model('tAttendance',attendanceSchema);