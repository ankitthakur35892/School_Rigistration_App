const Class = require('../../models/classModel');

exports.newClass = async (req,res)=>{
  try{  const isExist = await Class.findOne({standard:req.body.standard});
    if(isExist){
        return res.status(400).json({
            msg:'class already exist'
        })
    }
   const className= await Class.create(req.body);
    res.status(200).json({
        msg:'class created',
        data:className
    })
}catch(err){
    console.log(err);
    res.send(err)
}
};

exports.findClass = async(req,res)=>{
  try{  const findClass = await Class.find({standard:req.body.standard});
    if(findClass){
        return res.status(200).json({
            msg:'class found',
            data:findClass
        })
    }
    res.status(400).json({
        msg:'class not found'
    })
}catch(err){
    console.log(err);
    res.send(err)
}
}

exports.updateClass = async(req,res)=>{
  try{  const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
      const updation=  await Class.updateOne({standard:req.body.standard},req.body,{new:true});
        return res.status(200).json({
            msg:'class updated',
            data:updation
        }) 
    }
    res.status(400).json({
        msg:'class not found'
    })
}catch(err){
    console.log(err);
    res.send(err)
}
}

exports.deleteClass = async(req,res)=>{
  try{  const isExist = await Class.findById({_id:req.params.id});
    if(isExist){
      const remove =  await Class.deleteOne({_id:req.params.id});
        return res.status(200).json({
            msg:'class deleted'
        })
    }
    res.status(400).json({
        msg:'class not found'
    })
}catch(err){
    console.log(err);
    res.json(err)
}
}