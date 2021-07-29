const eAttendance = require('../../models/eAttendanceModel');

exports.createAttendance = async(req,res)=>{
    try {
        const isExist = await eAttendance.findOne({subjectId:req.body.subjectId,
            classId:req.body.classId,teacherId:req.body.teacherId});
            if(isExist){
                return res.json({
                    msg:'attendance exist already'
                })
            }
            const attendance = await eAttendance.create(req.body);
            await eAttendance.findOneAndUpdate(isExist,req.body,{new:true})
            re.json({
                msg:'attendance submitted successfully',
                data:attendance
            })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }    
}