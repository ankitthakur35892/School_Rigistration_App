const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    subjectId:{type:mongoose.Types.ObjectId,ref:"Subject"}
});
module.exports = mongoose.model('Teacher',teacherSchema)