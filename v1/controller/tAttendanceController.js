const Attendance = require('../../models/teacherAttendance');

// add new attendance
exports.createAttendance = async(req,res)=>{
    try{
    req.body.date = new Date(req.body.date)
    const isExist = await Attendance.findOne({teacherId:req.body.teacherId,date:req.body.date});//finding attendance
    if(isExist){
        return res.json({
            msg:'attendance submitted already'
        })
    }
    const attendance = await Attendance.create(req.body);//creating attendance
    res.json({
        msg:'attendance submitted successfully',
        data:attendance
    })
    }catch(err){
        console.log(err);
        res.send(err)
    }
};

// find attendance
exports.findAttendance = async(req,res)=>{
    try {
        let {teacher,date}=req.query;
        let query = {};
        if(teacher){
            query = {teacherId:teacher}
        }
        else{
            query={date:date}
        }
        const attendance = await Attendance.find(query);//finding attendance by query
        if(attendance){
            return res.json({
                msg:'attendance found',
                data:attendance
            })
        }
        res.json({
            msg:'attendance not found'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  
};
// update attendance
exports.updateAttendance = async(req,res)=>{
    try {
        const updation = await Attendance.findByIdAndUpdate({teacherId:req.body.teacherId},
            req.body,{new:true})//updating attendance
        if(updation){
            return res.json({
                msg:'attendance updated successfully',
                data:updation
            })
        }
        res.json({
            msg:'attendance not found'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  
};
// delete attendance
exports.deleteAttendance = async(req,res)=>{
    try {
        const remove  = await Attendance.deleteOne({_id:req.params.id});//delte attendance by id
        if(remove){
           return res.json({
               msg:'attendance deleted',
               data:remove
           })
        }
        res.josn({
            msg:'attendance not found'
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }   
}