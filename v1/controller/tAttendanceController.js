const Attendance = require('../../models/teacherAttendance');


exports.createAttendance = async(req,res)=>{
    const isExist = await Attendance.findOne({teacherId:req.body.teacherId,date:req.body.date});
    if(isExist){
        return res.json({
            msg:'attendance submitted already'
        })
    }
    const attendance = await Attendance.create(req.body);
    await Attendance.updateOne({teacherId:req.body.teacherId},{present:true})
    res.json({
        msg:'attendance submitted successfully',
        attendance
    })
};

exports.findAttendance = async(req,res)=>{
    let {teacher,date}=req.query;
    let query = {};
    if(teacher){
        query = {teacherId:teacher}
    }
    else{
        query={date:date}
    }
    const attendance = await Attendance.find(query);
    if(attendance){
        return res.json({
            msg:'attendance found',
            attendance
        })
    }
    res.json({
        msg:'attendance not found'
    })
};

exports.updateAttendance = async(req,res)=>{
    const updation = await Attendance.findOneAndUpdate({teacherId:req.body.teacherId},req.body,{new:true})
    if(updation){
        return res.json({
            msg:'attendance updated successfully',
            updation
        })
    }
    res.json({
        msg:'attendance not found'
    })
};

exports.deleteAttendance = async(req,res)=>{
    const remove  = await Attendance.deleteOne({_id:req.params.id});
    if(remove){
       return res.json({
           msg:'attendance deleted'
       })
    }
    res.josn({
        msg:'attendance not found'
    })
}