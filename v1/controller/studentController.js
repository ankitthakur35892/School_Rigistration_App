const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../../models/studentModel');
const Class = require('../../models/classModel');
const Otp = require('../../models/otpModel')
var otp = 8462829239;
exports.newStudent = async (req,res)=>{
    try {
        const email = await Student.findOne({email:req.body.email});
    if(email){
        return res.json({
            msg:'student already exist'
        })
    }
    const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
    await Student.create(req.body); 
    await Otp.create({email:req.body.email,otp:otp})
   const count= await Student.countDocuments();
  const updation= await Class.findOneAndUpdate({_id:req.body.classId},{classStrength:count},{new:true});
    res.json({
        msg:'new student added',
        otp
    })
    } catch (error) {
        console.log(error);
    }
};

exports.verifyOtp = async(req,res)=>{
    const isEmail = await Otp.findOne({email:req.body.email});
    const isOtp = await Otp.findOne({otp:req.body.otp})
    if(!isEmail){
        return res.json({
            msg:'email not exist'
        })
    }
    else if(!isOtp){
        return res.json({
            msg:'incorrect otp'
        })
    }
    await Student.findOneAndUpdate({email:req.body.email},{isVerified:true},{new:true})
    res.json({
        msg:'student verified'
    })
}

exports.changePassword = async(req,res)=>{
    const isEmail = await Student.findOne({email:req.body.email});
    if(!isEmail){
        return res.json({
            msg:'email not found'
        })
    }
    const paswd = isEmail.password;
    const compare = await bcrypt.compare(req.body.password,paswd);
    if(!compare){
        return res.json({
            msg:'incorrect password'
        })
    }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
        console.log(hashPassword);
        const updation = await Student.findOneAndUpdate({email:req.body.email},
            {password: hashPassword},{new:true});
            return res.json({
                msg:'password changed',
                updation
            })
    }


exports.forgetPassword = async(req,res)=>{
    const isEmail = await Student.findOne({email:req.body.email});
    if(!isEmail){
        return res.json({
            msg:'email not found'
        })
    }
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
    const updation = await Student.findOneAndUpdate({email:req.body.email},
        {password:hashPassword},{new:true});
        res.json({
            msg:'password created',
            updation
        })
}
exports.findStudent = async(req,res)=>{
    let {name,rollNo,email}=req.query;
    let query = {};
    if(name){
       query={studentName:name};
    }
    else if(rollNo){
        query= {rollNo:rollNo}
    }else{
        query={email:email}
    }
    const student  = await Student.find(query);
    res.json({
        msg:'Student is:',
        student
    })
};

exports.updateStudent= async(req,res)=>{
 try {
    const updation = await Student.findOneAndUpdate({rollNo:req.body.rollNo},req.body,{new:true});
    if(updation){
        return res.json({
            msg:'student updated',
            new:updation
        })
    }
    res.json({
        msg:'student not found'
    })
 } catch (error) {
     console.log(error);
 }  
}

exports.deleteStudent = async(req,res)=>{
  const remove = await Student.deleteOne({_id:req.params.id});
if(!remove){
    return res.json({
        msg:'student not found'
    })
}
res.json({
    msg:'student deleted'
})
}

exports.login = async (req,res)=>{
  try {
    const isEmail = await Student.findOne({email:req.body.email});
    const paswd = isEmail.password
    let compare = await bcrypt.compare(req.body.password,paswd)
    if(!isEmail){
        return res.json({
            msg:'email not exist'
        })
    }
    else if(!compare){
        return res.json({
            msg:'incorrect password'
        })
    }
    let token = jwt.sign({id:isEmail._id},"asdfghjkl",{expiresIn:"2h"});
    res.json({
        msg:'login successfully',
        token
    })
  } catch (error) {
      console.log(error);
  }  
}