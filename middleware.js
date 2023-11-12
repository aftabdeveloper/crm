import { NextResponse } from 'next/server'
const res = NextResponse

export const middleware = async (req)=>{
    const authToken= req.cookies.has("authToken")

    if(!authToken) return res.redirect(new URL('/login', req.url))
    const {value} = req.cookies.get("authToken")

    if (req.nextUrl.pathname.startsWith('/admin')) {
        try
        {
            const http = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/jwt/${value}`)
            if(http.status !== 200) return res.redirect(new URL('/login', req.url))
            const session = await http.json()
            const header = res.next()
            header.cookies.set({
                name: "session",
                value: JSON.stringify(session),
                path: "/"
            })
            return header
        }
        catch(err)
        {
            return res.redirect(new URL('/login', req.url))
        }
    }
    
    if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) {
        try
        {
            const http = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/jwt/${value}`)
            if(http.status !== 200) return res.next()
            const session = await http.json()
            const header = res.next()
            header.cookies.set({
                name: "session",
                value: JSON.stringify(session),
                path: "/"
            })
            return (
                header,
                res.redirect(new URL('/admin',req.url))
            )

        }
        catch(err)
        {
            return res.next()
        }  
    }

}

export const config = {
    matcher: ['/admin','/login','/signup']
}