//export { default } from "next-auth/middleware"

import withAuth, { NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

/* export function middleware(request: NextRequestWithAuth) {
    console.log("Request", request)
    //return NextResponse.redirect(new URL('/bu/mywork', request.url))
} */

export default withAuth(function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token
    const pathName = request?.nextUrl?.pathname
    if (!pathName.includes("signin")) {
        if (token) {
            const role = token.role
            if (
                !pathName.toLowerCase().includes((role as string).toLowerCase())
            ) 
            {
                return NextResponse.redirect(
                    new URL("/notAuthorized", request.url)
                )
            }
        } else {
            return NextResponse.redirect(new URL("/auth/signin", request.url))
        }
    }
})

export const config = {
    matcher: ["/dashboard", "/bu/:path*", "/teller/:path*"]
}

/* const protectedPaths = ["/dashboard", "/bu"]

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const isPathProtected = protectedPaths?.some((path) => pathname === path)
    const res = NextResponse.next()
    if (isPathProtected) {
        const token = await getToken({ req })
        if (!token) {
            const url = new URL(`/auth/signin`, req.url)
            url.searchParams.set(
                "callbackUrl",
                process.env.NEXT_PUBLIC_SERVER_URL + "/" + pathname
            )
            return NextResponse.redirect(url)
        } else {
            const role = token.role
            if (role === "BU") {
                return NextResponse.redirect(
                    new URL("/bu/template", process.env.NEXT_PUBLIC_SERVER_URL)
                )
            } else if (role === "TELLER") {
                return NextResponse.redirect(
                    new URL("/teller", process.env.NEXT_PUBLIC_SERVER_URL)
                )
            } else {
                return NextResponse.redirect(
                    new URL("/auth/login", process.env.NEXT_PUBLIC_SERVER_URL)
                )
            }
        }
    }
    return res
} */
