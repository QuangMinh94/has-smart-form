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
            let pathList: string[] = pathName.split("/")
            let lowerPath = pathList.map((element) => {
                return element.toLowerCase()
            })
            //console.log("Path list", role)
            if (role) {
                if (lowerPath.indexOf(role.toString().toLowerCase()) < 0) {
                    return NextResponse.redirect(
                        new URL(
                            `/${(role as string).toLowerCase()}`,
                            request.url
                        )
                    )
                }
            } else {
                return NextResponse.redirect(
                    new URL("/auth/signin", request.url)
                )
            }
        } else {
            return NextResponse.redirect(new URL("/auth/signin", request.url))
        }
    }
})

export const config = {
    matcher: ["/dashboard", "/bu/:path*", "/teller/:path*", "/ksvteller/:path*"]
}
