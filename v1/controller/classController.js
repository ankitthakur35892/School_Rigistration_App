const Class = require('../../models/classModel');

exports.newClass = async (req,res)=>{
    const isExist = await Class.findOne({standard:req.body.standard});
    if(isExist){
        return res.json({
            msg:'class already exist'
        })
    }
   const className= await Class.create(req.body);
    res.json({
        msg:'class created',
        data:className
    })
};

exports.findClass = async(req,res)=>{
    const findClass = await Class.find({standard:req.body.standard});
    if(findClass){
        return res.json({
            msg:'class found',
            data:findClass
        })
    }
    res.json({
        msg:'class not found'
    })
}

exports.updateClass = async(req,res)=>{
    const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
      const updation=  await Class.updateOne({standard:req.body.standard},req.body,{new:true});
        return res.json({
            msg:'class updated',
            data:updation
        }) 
    }
    res.json({
        msg:'class not found'
    })
}

exports.deleteClass = async(req,res)=>{
    const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
      const remove =  await Class.deleteOne({_id:req.params.id});
        return res.json({
            msg:'class deleted',
            data:remove
        })
    }
    res.json({
        msg:'class not found'
    })
}