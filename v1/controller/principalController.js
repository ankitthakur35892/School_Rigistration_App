const jwt = require('jsonwebtoken')
const Principal = require('../../models/principalModel');
const Otp = require('../../models/otpModel')
const bcrypt = require('bcrypt');
const otp = 127438293;
exports.addPrincipal = async(req,res)=>{
    try {
        const isExist = await Principal.findOne({email:req.body.email});
        if(isExist){
            return res.status(400).json({
                msg:'principal exist already'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const principal = await Principal.create(req.body);
        await Otp.create({email:req.body.email,otp})
        res.status(200).json({
            msg:'added successfully',
            data:otp,principal
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  
}


exports.verifyOtp = async(req,res)=>{
    try {
        const isEmail = await Otp.findOne({email:req.body.email});
        const isOtp = await Otp.findOne({otp:req.body.otp})
        if(!isEmail){
            return res.status(400).json({
                msg:'email not exist'
            })
        }
        else if(!isOtp){
            return res.status(400).json({
                msg:'incorrect otp'
            })
        }
        await Principal.findOneAndUpdate({email:req.body.email},{isVerified:true},{new:true})
        res.status(200).json({
            msg:'principal verified'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }    
}

exports.changePassword = async(req,res)=>{
    try {
        const principal = await Principal.findOne({_id:req.decoded.id})
        if(!principal){
            return res.status(400).json({
                msg:'principal not found'
            })
        }
        const paswd = isEmail.password;
        const compare = await bcrypt.compare(req.body.password,paswd);
        if(!compare){
            return res.status(400).json({
                msg:'incorrect password'
            })
        }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
            console.log(hashPassword);
            const updation = await Principal.findByIdAndUpdate(principal,
                {password: hashPassword},{new:true});
                return res.status(200).json({
                    msg:'password changed',
                    data:updation
                })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }    
    }


exports.forgetPassword = async(req,res)=>{
    try {
        const principal = await Principal.findOne({email:req.body.email});
        if(!principal){
            return res.status(200).json({
                msg:'principal not found'
            })
        }
        const salt =await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
        const updation = await Principal.findOneAndUpdate(principal,
            {password:hashPassword},{new:true});
            res.status(200).json({
                msg:'password created',
                data:updation
            })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  
}

exports.findPrincipal = async(req,res)=>{
    try {
        let {name,email}=req.query;
    let query = {};
    if(name){
       query={principalName:name};
    }
    else{
        query={email:email}
    }
    const principal  = await Principal.find(query);
    res.status(200).json({
        msg:'Principal is:',
        data:principal
    })

    } catch (error) {
        console.log(error);
        res.send(error)
        
    } };

exports.updatePrincipal= async(req,res)=>{
 try {
    const updation = await Principal.findOneAndUpdate({email:req.body.email},req.body,{new:true});
    if(updation){
        return res.status(200).json({
            msg:'principal updated',
            data:updation
        })
    }
    res.status(400).json({
        msg:'principal not found'
    })
 } catch (error) {
     console.log(error);
 }  
}

exports.deletePrincipal = async(req,res)=>{
  const remove = await Principal.deleteOne({_id:req.params.id});
if(!remove){
    return res.status(400).json({
        msg:'principal not found'
    })
}
res.status(200).json({
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
        return res.status(400).json({
            msg:'email not exist'
        })
    }
    else if(!compare){
        return res.status(400).json({
            msg:'incorrect password'
        })
    }
    let token = jwt.sign({id:isEmail._id},"asdfghjkl",{expiresIn:"2h"});
    res.status(200).json({
        msg:'login successfully',
        data:token
    })
  } catch (error) {
      console.log(error);
  }  
}