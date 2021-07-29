const jwt = require('jsonwebtoken')
const Principal = require('../../models/principalModel');
const Otp = require('../../models/otpModel')
const bcrypt = require('bcrypt');
const otp = 127438293;
exports.addPrincipal = async(req,res)=>{
    const isExist = await Principal.findOne({email:req.body.email});
    if(isExist){
        return res.json({
            msg:'principal exist already'
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const principal = await Principal.create(req.body);
    await Otp.create({email:req.body.email,otp})
    res.json({
        msg:'added successfully',
        msg2:'otp sent',
        data:otp,principal
    })
}


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
    await Principal.findOneAndUpdate({email:req.body.email},{isVerified:true},{new:true})
    res.json({
        msg:'principal verified'
    })
}

exports.changePassword = async(req,res)=>{
    const isEmail = await Principal.findOne({email:req.body.email});
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
        const updation = await Principal.findOneAndUpdate({email:req.body.email},
            {password: hashPassword},{new:true});
            return res.json({
                msg:'password changed',
                data:updation
            })
    }


exports.forgetPassword = async(req,res)=>{
    const isEmail = await Principal.findOne({email:req.body.email});
    if(!isEmail){
        return res.json({
            msg:'email not found'
        })
    }
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
    const updation = await Principal.findOneAndUpdate({email:req.body.email},
        {password:hashPassword},{new:true});
        res.json({
            msg:'password created',
            data:updation
        })
}

exports.findPrincipal = async(req,res)=>{
    let {name,email}=req.query;
    let query = {};
    if(name){
       query={principalName:name};
    }
    else{
        query={email:email}
    }
    const principal  = await Principal.find(query);
    res.json({
        msg:'Principal is:',
        data:principal
    })
};

exports.updatePrincipal= async(req,res)=>{
 try {
    const updation = await Principal.findOneAndUpdate({email:req.body.email},req.body,{new:true});
    if(updation){
        return res.json({
            msg:'principal updated',
            data:updation
        })
    }
    res.json({
        msg:'principal not found'
    })
 } catch (error) {
     console.log(error);
 }  
}

exports.deletePrincipal = async(req,res)=>{
  const remove = await Principal.deleteOne({_id:req.params.id});
if(!remove){
    return res.json({
        msg:'principal not found'
    })
}
res.json({
    msg:'principal deleted',
    data:remove
})
}

exports.login = async (req,res)=>{
  try {
    const isEmail = await Principal.findOne({email:req.body.email});
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
        data:token
    })
  } catch (error) {
      console.log(error);
  }  
}