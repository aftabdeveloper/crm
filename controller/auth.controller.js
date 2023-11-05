import axios from "axios"
axios.defaults.baseURL=process.env.NEXT_PUBLIC_ENDPOINT
export const signup = async (req,res)=>{
    try
    {
        const {companyName,founder,gst,mobile,email,password} = req.body
        const {data: Company} = await axios.post("/api/company",{companyName,founder,gst})
        await axios.post("/api/user",{email,mobile,password,company:Company._id})
    }
    catch(err)
    {
        console.log(err)
    }
}

export default signup