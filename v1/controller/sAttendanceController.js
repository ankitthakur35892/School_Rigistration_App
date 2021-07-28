const mongoose = require('mongoose');
const Attendance = require('../../models/studentAttendance');

exports.createAttendance = async(req,res)=>{
    const isExist = await Attendance.findOne({subjectId:req.body.subjectId,studentId:req.body.studentId,date:req.body.date});
    if(isExist){
        return res.json({
            msg:'attendance submitted already'
        })
    }
    const attendance = await Attendance.create(req.body);
    await Attendance.updateOne({studentId:req.body.studentId},{present:true})
    res.json({
        msg:'attendance submitted successfully',
        data:attendance
    })
};

exports.findAttendance = async(req,res)=>{
    // console.log(req.query);
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
    console.log(attendance);
    if(attendance){
        return res.json({
            msg:'attendance found',
            data:attendance
        })
    }
    res.json({
        msg:'attendance not found'
    })
};

exports.updateAttendance = async(req,res)=>{
    const updation = await Attendance.findOneAndUpdate({subjectId:req.body.subjectId,
        studentId:req.body.studentId},req.body,{new:true})
    if(updation){
        return res.json({
            msg:'attendance updated successfully',
            data:updation
        })
    }
    res.josn({
        msg:'attendance not found'
    })
};

exports.deleteAttendance = async(req,res)=>{
    const remove  = await Attendance.deleteOne({_id:req.params.id});
    if(remove){
       return res.json({
           msg:'attendance deleted',
           data:remove
       })
    }
    res.josn({
        msg:'attendance not found'
    })
}