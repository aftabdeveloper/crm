import { update, remove, fetchById} from "@/controller/user.controller"
const user = (req,res)=>{
    const {method} = req
    if(method === "GET") return fetchById(req,res)
    if(method === "PUT") return update(req,res)
    if(method === "DELETE") return remove(req,res) 
    res.status(405).json("Method not allowed")
}

export default user