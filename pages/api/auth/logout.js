import {logout} from "@/controller/auth.controller"
const handler = (req,res)=>{
    if(req.method === "POST") return logout(req,res)
    res.status(405).send("Method not allowed")
}

export default handler