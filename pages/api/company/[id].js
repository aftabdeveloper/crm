import {update,remove} from "@/controller/company.controller"

const Company = (req,res)=> {
    const {method} = req
    if(method === "PUT") return update(req,res)
    if(method === "DELETE") return remove(req,res)
    res.status(405).send("Method not allowed")
}

export default Company