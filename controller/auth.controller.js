import axios from "axios"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import bcrypt from "bcrypt"
axios.defaults.baseURL=process.env.NEXT_PUBLIC_ENDPOINT
export const signup = async (req,res)=>{
    try
    {
        const {companyName,founder,gst,mobile,email,password} = req.body
        const {data: Company} = await axios.post("/api/company",{companyName,founder,gst})
        const {data: User} = await axios.post("/api/user",{email,mobile,password,company:Company._id})
        const token = jwt.sign({
            id: User._id,
            company: User.company,
            founder: Company.founder,
            gst: Company.gst,
            email: User.email
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {expiresIn: '7d'})
        const cookieData = cookie.serialize("authToken",token,{
            httpOnly: true,
            path: "/",
            maxAge: 604800
        })
        res.setHeader("Set-Cookie", cookieData)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body
    try
    {
        const {data: User} = await axios.get(`/api/user?email=${email}`)
        const auth = await bcrypt.compare(password,User.password)
        if(!auth) return res.status(401).json({success: false})
        const token = jwt.sign({
            id: User._id,
            company: User.company,
            email: User.email
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {expiresIn: '7d'})
        const cookieData = cookie.serialize("authToken",token,{
            httpOnly: true,
            path: "/",
            maxAge: 604800
        })
        res.setHeader("Set-Cookie", cookieData)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(err.response.status).json(err.response.data)
    }
    
}