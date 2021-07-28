const Subject = require('../../models/subjectModel');

exports.addsubject = async(req,res)=>{
    const isExist = await Subject.findOne({subjectName:req.body.subjectName});
    if(isExist){
        return res.json({
            msg:'subject already exist'
        })
    }
  const subject=  await Subject.create(req.body);
    res.json({
        msg:'subject added',
        data:subject
    })
}

exports.findSubject = async(req,res)=>{
    let {name} = req.query;
    let query={};
    query={subjectName:name};
    const subject = await Subject.find(query);
    if(subject){
        return res.json({
            msg:'subject found',
            data:subject
        })
    }
    res.json({
        msg:'subject not found'
    })
}

exports.updateSubject = async(req,res)=>{
    const updation = await Subject.findByIdAndUpdate({_id:req.body.id},req.body,{new:true})
    if(updation){
        return res.json({
            msg:'updated successfully',
            data:updation
        })
    }
    res.json({
        msg:'subject not found'
    })
}

exports.deleteSubject = async(req,res)=>{
    const remove = await Subject.deleteOne({_id:req.params.id});
    if(remove){
       return res.json({
            msg:'delted successfully',
            data:remove
        })
    }   
    res.json({
        msg:'subject not found'
    })
}