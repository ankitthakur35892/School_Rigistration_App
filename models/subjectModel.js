const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    subjectName:{type:String},
    classId:{type:mongoose.Types.ObjectId,ref:'Class'}
})
module.exports = mongoose.model("Subject",subjectSchema)