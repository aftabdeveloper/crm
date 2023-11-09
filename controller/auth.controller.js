import axios from "axios"
import jwt from "jsonwebtoken"
import cookie from "cookie"
axios.defaults.baseURL=process.env.NEXT_PUBLIC_ENDPOINT
export const signup = async (req,res)=>{
    try
    {
        const {companyName,founder,gst,mobile,email,password} = req.body
        const {data: Company} = await axios.post("/api/company",{companyName,founder,gst})
        const {data: User} = await axios.post("/api/user",{email,mobile,password,company:Company._id})
        console.log(Company)
        console.log(User)
        const token = jwt.sign({
            id: User._id,
            companyName: Company.companyName,
            founder: Company.founder,
            gst: Company.gst,
            email: User.email
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {expiresIn: '7d'})
        console.log(token)
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

export default signup