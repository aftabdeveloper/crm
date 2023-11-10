import Admin from "@/components/admin";
import jwt from "jsonwebtoken";
const AdminRoute = (session)=>{
    console.log(session)
    return <Admin session={session} />
}
export default AdminRoute

export const getServerSideProps = ({req})=>{
    const {authToken} = req.cookies
    if(!authToken)
    return {
        redirect: {
            destination: "/login",
            permanent: false
        }
    }
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