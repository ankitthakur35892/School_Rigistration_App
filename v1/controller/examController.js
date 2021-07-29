const Exam = require('../../models/examModel');

exports.createExam = async(req,res)=>{
   try{
        const isExam = await Exam.findOne({classId:req.body.classId,subjectId:req.body.subjectId});
    if(!isExam){
        req.body.date = new Date(req.body.date);
        const exam = await Exam.create(req.body)
        return res.status(200).json({
            msg:'exam created',
            data:exam
        })
    }
    res.status(400).json({
        msg:'exam exist already'
    })
}catch(err){
    console.log(err);
    res.send(err)
}
};

exports.findExam = async(req,res)=>{
    try {
        let {subject,classId,date}=req.query;
        let query = {};
        if(subject&&classId){
            query={subjectId:subject,classId:classId};
        }
        else{
            query:{date:date};
        }
        const exam  =await Exam.find(query);
        res.status(200).json({
            msg:'exam found',
            data:exam
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  
};

exports.updateExam = async(req,res)=>{
    try {
      
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }   const isExam = await Exam.findOne({subjectId:req.body.subjectId,classId:req.body.classId});
    if(!isExam){
        return res.status(400).json({
            msg:'exam not found'
        })
    }
    const updation = await Exam.findOneAndUpdate({subjectId:req.body.subjectId,classId:req.body.classId},
        req.body,{new:true});
        res.status(200).json({
            msg:'exam updated',
            data:updation
        })
};

exports.deleteExam = async(req,res)=>{
    try {
        const remove = await Exam.deleteOne({_id:req.params.id});
        if(!remove){
            return res.status(400).json({
                msg:'exam not found'
            })
        }
        res.status(200).json({
            msg:'exam deleted',
            data:remove
        })
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }    
}