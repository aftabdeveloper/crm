import Admin from "@/components/admin";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
const AdminRoute = (data)=>{
    console.log(data)
    return <Admin />
}
export default AdminRoute

export const getServerSideProps = (context)=>{
    const {req} = context
    const {authToken} = req.cookies
    try
    {
      const session = jwt.verify(authToken,process.env.NEXT_PUBLIC_JWT_SECRET)
      return {
        props: session
      }
    }
    catch(err)
    {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
}