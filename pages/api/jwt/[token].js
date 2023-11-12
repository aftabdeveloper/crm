import {tokenVerify} from "@/controller/jwt.controller"
const jwt = (req,res)=>{
    if(req.method === "GET") return tokenVerify(req,res)
    res.status(405).send("Method not allowed")
}

export default jwt