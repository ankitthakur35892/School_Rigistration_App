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
        className
    })
};

exports.findClass = async(req,res)=>{
    const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
        return res.json({
            msg:'class found'
        })
    }
    res.json({
        msg:'class not found'
    })
}

exports.updateClass = async(req,res)=>{
    const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
        await Class.updateOne({standard:req.body.standard},req.body,{new:true});
        return res.json({
            msg:'class updated'
        }) 
    }
    res.json({
        msg:'class not found'
    })
}

exports.deleteClass = async(req,res)=>{
    const isExist = await Class.find({standard:req.body.standard});
    if(isExist){
        await Class.deleteOne({standard:req.params.standard});
        return res.json({
            msg:'class deleted'
        })
    }
    res.json({
        msg:'class not found'
    })
}