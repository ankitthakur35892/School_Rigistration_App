const Teacher = require('../../models/teacherModel');
const Otp = require('../../models/otpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otp = 8436762387;
exports.addTeacher = async(req,res)=>{
  try{  const isEmail = await Teacher.findOne({email:req.body.email});
    if(isEmail){
        return res.json({
            msg:'email already exist'
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const teacher =  await Teacher.create(req.body);
    await Otp.create({email:req.body.email,otp:otp})
    res.json({
        msg:'teacher added',
        msg2:'otp sent',
        data:otp,teacher
    })
}catch(err){
    console.log(err);
    res.send(err)
}
};



exports.verifyOtp = async(req,res)=>{
  try{  const isEmail = await Otp.findOne({email:req.body.email});
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
    await Teacher.findOneAndUpdate({email:req.body.email},{isVerified:true},{new:true})
    res.json({
        msg:'teacher verified'
    })
}catch(err){
    console.log(err);
    res.send(err)
}
}

exports.changePassword = async(req,res)=>{
  try{  const teacher = await Teacher.findOne({_id:req.decoded.id});
    if(!teacher){
        return res.json({
            msg:'teacher not found'
        })
    }
    const paswd = teacher.password;
    const compare = await bcrypt.compare(req.body.password,paswd);
    if(!compare){
        return res.json({
            msg:'incorrect password'
        })
    }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
        console.log(hashPassword);
        const updation = await Teacher.findByIdAndUpdate(teacher,
            {password: hashPassword},{new:true});
            return res.json({
                msg:'password changed',
                data:updation
            })
        }catch(err){
            console.log(err);
            res.send(err)
        }
    }


exports.forgetPassword = async(req,res)=>{
 try{   const teacher = await Teacher.findOne({_id:req.decoded.id})
    if(!teacher){
        return res.json({
            msg:'teacher not found'
        })
    }
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword,salt);
    const updation = await Teacher.findByIdAndUpdate(teacher,
        {password:hashPassword},{new:true});
        res.json({
            msg:'password created',
            data:updation
        })
    }catch(err){
        console.log(err);
        res.send(err)
    }
}
exports.findTeacher = async(req,res)=>{
  try { let {name,email} = req.query;
    let query = {};
    if(name){
        query={name:name}
    }
    else{
        query={email:email}
    }
    const teacher = await Teacher.find(query);
    if(teacher){
   return res.json({
        msg:'teacher found',
        data:teacher
    })
}
res.json({
    msg:'teacher not found'
})
  }catch(err){
      console.log(err);
      res.send(err)
  }
};

exports.updateTeacher = async(req,res)=>{
try{
     const updation = await Teacher.findOneAndUpdate({email:req.body.email},req.body,{new:true});
 if(updation){
     return res.json({
         msg:'teacher updated',
         data:updation
     })
 }
 res.json({
     msg:'teacher not found'
 })
}catch(err){
    console.log(err);
    res.send(err)
}
};

exports.deleteTeacher = async(req,res)=>{
 try {
    const remove = await Teacher.deleteOne({_id:req.params.id});
    if(remove){
        return res.json({
            msg:'teacher deleted',
            data:remove
        })
    }
    res.json({
        msg:'teacher not found'
    })

 } catch (error) {
     console.log(error);
     res.send(err)
 }   }

exports.login = async(req,res)=>{
   try{ const isEmail = await Teacher.findOne({email:req.body.email});
    const paswd = isEmail.password;
    const compare = await bcrypt.compare(req.body.password,paswd);
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
}catch(err){
    console.log(err);
    res.send(err)
}
}