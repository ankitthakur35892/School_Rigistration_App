const Subject = require('../../models/subjectModel');

exports.addsubject = async(req,res)=>{
  try{  const isExist = await Subject.findOne({subjectName:req.body.subjectName});
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
}catch(err){
    console.log(err);
    res.send(err)
}
}

exports.findSubject = async(req,res)=>{
  try {
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
  } catch (error) {
      console.log(error);
      res.send(error)
      
  }  
}

exports.updateSubject = async(req,res)=>{
    try {
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
    } catch (error) {
        console.log(error);
        res.send(error)
        
    } 
}

exports.deleteSubject = async(req,res)=>{
    try {
      
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }  const remove = await Subject.deleteOne({_id:req.params.id});
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