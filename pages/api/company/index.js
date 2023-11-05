import {fetch,create} from "@/controller/company.controller"

const company = (req,res)=> {
    const {method} = req
    if(method === "GET") return fetch(req,res)
    if(method === "POST") return create(req,res)
    res.status(405).send("Method not allowed")
}

export default company