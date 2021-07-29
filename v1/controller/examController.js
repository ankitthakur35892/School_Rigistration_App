const Exam = require('../../models/examModel');

exports.createExam = async(req,res)=>{
    const isExam = await Exam.findOne({classId:req.body.classId,subjectId:req.body.subjectId});
    if(isExam){
        const exam = await Exam.create(req.body)
        return res.json({
            msg:'exam created',
            data:exam
        })
    }
};

exports.findExam = async(req,res)=>{
    let {subjectId,classId,date}=req.query;
    let query = {};
    if(subject&&classId){
        query={subjectId:subjectId,classId:classId};
    }
    else{
        query:{date:date};
    }
    const exam  =await Exam.find(query);
    res.json({
        msg:'exam found',
        data:exam
    })
};

exports.updateExam = async(req,res)=>{
    const isExam = await Exam.findOne({subjectId:req.body.subjectId,classId:req.body.classId});
    if(!isExam){
        return res.json({
            msg:'exam not found'
        })
    }
    const updation = await Exam.findOneAndUpdate({subjectId:req.body.subjectId,classId:req.body.classId},
        req.body,{new:true});
        res.json({
            msg:'exam updated',
            data:updation
        })
};

exports.deleteExam = async(req,res)=>{
      const remove = await Exam.deleteOne({_id:req.params.id});
      if(!remove){
          return res.json({
              msg:'exam not found'
          })
      }
      res.json({
          msg:'exam deleted',
          data:remove
      })
}