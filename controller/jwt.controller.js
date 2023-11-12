import jwt from "jsonwebtoken"
export const tokenVerify = (req,res)=>{
 const {token} = req.query;
 try
 {
   const data = jwt.verify(token,process.env.NEXT_PUBLIC_JWT_SECRET)
   res.status(200).json(data)
 }
 catch(err)
 {
    res.status(401).json({success: false})
 }
}

