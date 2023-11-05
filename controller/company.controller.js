import "@/modules/db"
import Company from "@/model/company.model"

export const fetch = async (req,res)=>{
    const company = await Company.find()
    res.status(200).json(company)
}

export const create = async (req,res)=>{
    try{
        const company = new Company(req.body)
        await company.save()
        res.status(200).json(company)
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
}

export const update = async (req,res)=>{
    try
    {
        const {query: {id}} = req
        await Company.updateOne({_id:id},req.body)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}

export const remove = async (req,res)=>{
    try
    {
        const id = req.query.id
        const response = await Company.deleteOne({_id: id})
        res.status(200).json(response)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
    
}
