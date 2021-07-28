const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    standard:{type:Number},
    classStrength:{type:Number}
})
module.exports = mongoose.model('Class',classSchema);
