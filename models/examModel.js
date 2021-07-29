const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
    classId:{type:mongoose.Types.ObjectId,ref:'Class'},
    date:{type:Date},
    subjectId:{type:mongoose.Types.ObjectId,ref:'Subject'}
});
module.exports = mongoose.model('Exam',examSchema)