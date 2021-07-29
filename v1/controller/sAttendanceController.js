const mongoose = require('mongoose');
const Attendance = require('../../models/studentAttendance');

exports.createAttendance = async(req,res)=>{
    try{
        req.body.date = new Date(req.body.date)
    const isExist = await Attendance.findOne({studentId: req.body.studentId, date: req.body.date});
    if(isExist){
        return res.status(400).json({
            msg:'attendance submitted already'
        })
    }
    const attendance =await Attendance.create(req.body);
    res.status(200).json({
        msg:'attendance submitted successfully',
        data:attendance
    })
}catch(err){
    console.log(err)
    res.send(err)
}
};

exports.findAttendance = async(req,res)=>{
    try {
        let {student,subject,date}=req.query;
        let query = {};
        if(student){
            query = {studentId:student}
        }
        else if(subject){
            query={subjectId:subject}
        }
        else{
            query={date:date}
        }
        const attendance = await Attendance.find(query);
        if(attendance){
            return res.status(200).json({
                msg:'attendance found',
                data:attendance
            })
        }
        res.status(400).json({
            msg:'attendance not found'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }   
    
};

exports.updateAttendance = async(req,res)=>{
    try {
        const updation = await Attendance.findOneAndUpdate({subjectId:req.body.subjectId,
            studentId:req.body.studentId},req.body,{new:true})
        if(updation){
            return res.status(200).json({
                msg:'attendance updated successfully',
                data:updation
            })
        }
        res.status(400).josn({
            msg:'attendance not found'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }    
};

exports.deleteAttendance = async(req,res)=>{
  try {
    const remove  = await Attendance.deleteOne({_id:req.params.id});
    if(remove){
       return res.status(200).json({
           msg:'attendance deleted',
           data:remove
       })
    }
    res.status(400).josn({
        msg:'attendance not found'
    })

  } catch (error) {
      console.log(error);
  } 
}