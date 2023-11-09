import "@/modules/db"
import User from "@/model/user.model"

export const fetch = async (req,res)=>{
    const user = await User.findOne(req.query)
    if(!user) return res.status(404).json({err: "User doesn't exist"})
    res.status(200).json(user)
}

export const fetchById = async (req,res)=>{
    try
    {
       let user = null
       if(req.query.populate === "true")
       user = await User.findById(req.query.id).populate("company")
       else
       user = await User.findById(req.query.id)
       res.status(200).json(user)
    }
    catch(err)
    {
       res.status(500).json({message: err.message}) 
    }
    
}

export const create = async (req,res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        user.password = undefined
        res.status(200).json(user)
    }
    catch(err)
    {
        res.status(500).json({err: err.message})
    }
}

export const update = async (req,res)=>{
    try
    {
        const id = req.query.id
        await User.updateOne({_id: id},req.body)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json({err: err.message})
    }
  
}

export const remove = async (req,res)=>{
    try
    {
        const id = req.query.id
        await User.deleteOne({_id: id})
        res.status(200).json({success: true})
    }
    catch(err) 
    {
        res.status(500).json({err: err.message})
    }

}