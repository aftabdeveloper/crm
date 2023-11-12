import Admin from "@/components/admin";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
const AdminRoute = ()=>{
    return <Admin />
}
export default AdminRoute
