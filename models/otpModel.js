const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    otp:{type:Number},
    email:{type:String}
});
module.exports = mongoose.model('Otp',otpSchema);