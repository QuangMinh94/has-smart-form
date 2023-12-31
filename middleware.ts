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

    //if (!pathName.includes("signin")) {
    if (token) {
        const role = token.role
        let pathList: string[] = pathName.split("/")
        let lowerPath = pathList.map((element) => {
            return element.toLowerCase()
        })
        //console.log("Path list", role)
        if (role) {
            if (lowerPath.indexOf(role.toString().toLowerCase()) < 0) {
                return NextResponse.redirect(
                    new URL(
                        `/users/${(role as string).toLowerCase()}`,
                        request.url
                    )
                )
            }
        } else {
            return NextResponse.redirect(new URL("/auth/signin", request.url))
        }
    } else {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
    //}
})

export const config = {
    matcher: [
        "/users/bu/:path*",
        "/users/teller/:path*",
        "/users/ksvteller/:path*",
        "/users/ba/:path*",
        "/users/administrator/:path*"
    ]
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
