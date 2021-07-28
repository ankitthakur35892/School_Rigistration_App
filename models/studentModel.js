const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studentName:{type:String},
    email:{type:String},
    rollNo:{type:Number,trim:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    classId:{type:mongoose.Types.ObjectId,ref:'Class'}
});
module.exports = mongoose.model('Student',studentSchema);