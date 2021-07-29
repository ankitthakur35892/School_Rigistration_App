const Teacher = require('../../models/teacherModel');
const Otp = require('../../models/otpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otp = 842387;
// add new teacher
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
// verify teacher
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
// login teacher
exports.login = async(req,res)=>{
    try{ const isEmail = await Teacher.findOne({email:req.body.email});//finding teacher by email
    const paswd = isEmail.password;
    const compare = await bcrypt.compare(req.body.password,paswd);//comparing password
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
    let token = jwt.sign({id:isEmail._id},"asdfghjkl",{expiresIn:"2h"});//token
    res.json({
        msg:'login successfully',
        data:token
    })
}catch(err){
    console.log(err);
    res.send(err)
}
}
// change password
exports.changePassword = async(req,res)=>{
  try{  const teacher = await Teacher.findOne({_id:req.decoded.id});//finding by id
    if(!teacher){
        return res.json({
            msg:'teacher not found'
        })
    }
    const paswd = teacher.password;
    const compare = await bcrypt.compare(req.body.password,paswd);//compare password
    if(!compare){
        return res.json({
            msg:'incorrect password'
        })
    }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword,salt);//hashing password
        const updation = await Teacher.findByIdAndUpdate(teacher,
            {password: hashPassword},{new:true});//update password
            return res.json({
                msg:'password changed',
                data:updation
            })
        }catch(err){
            console.log(err);
            res.send(err)
        }
    }

// forget password
exports.forgetPassword = async(req,res)=>{
 try{   const teacher = await Teacher.findOne({email:req.body.email})//find teacher by email
    if(!teacher){
        return res.json({
            msg:'teacher not found'
        })
    }
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword,salt);//hah password
    const updation = await Teacher.findByIdAndUpdate(teacher,
        {password:hashPassword},{new:true});//updaing teacher
        res.json({
            msg:'password created',
            data:updation
        })
    }catch(err){
        console.log(err);
        res.send(err)
    }
}
// find teacher
exports.findTeacher = async(req,res)=>{
  try { let {name,email} = req.query;
    let query = {};
    if(name){
        query={name:name}
    }
    else{
        query={email:email}
    }
    const teacher = await Teacher.find(query);//finding teacher by query
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
// update teacher
exports.updateTeacher = async(req,res)=>{
try{
     const updation = await Teacher.findOneAndUpdate({email:req.body.email},req.body,{new:true});//updating
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
// delete teacher
exports.deleteTeacher = async(req,res)=>{
 try {
    const remove = await Teacher.deleteOne({_id:req.params.id});//delete teacher by id
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