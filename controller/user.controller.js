import "@/modules/db"
import User from "@/model/user.model"

export const fetch = async (req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
}

export const create = async (req,res)=>{
    try{
        const user = new User(req.body)
        await user.save()
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