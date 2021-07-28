const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    classStandard:{type:Number},
    classStrength:{type:Number}
})
module.exports = mongoose.model('Class',classSchema);
