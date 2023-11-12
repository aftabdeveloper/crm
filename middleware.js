import { NextResponse } from 'next/server'
const res = NextResponse

export const middleware = async (req)=>{
    const authToken= req.cookies.has("authToken")

    if(!authToken) return res.redirect(new URL('/login', req.url))

    try
    {
        const {value} = req.cookies.get("authToken")
        const http = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/jwt/${value}`)
        if(http.status !== 200) return res.redirect(new URL('/login', req.url))
        const session = await http.json()
        return res.next()
    }
    catch(err)
    {
        return res.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: '/admin',
}