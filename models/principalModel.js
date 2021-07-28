const mongoose = require('mongoose');
const principalSchema = new mongoose.Schema({
    principalName:{type:String},
    email:{type:String},
    password:{type:String},
    isVerified:{type:Boolean,default:false}
});
module.exports = mongoose.model('Principal',principalSchema);