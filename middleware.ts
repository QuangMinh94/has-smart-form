export { default } from "next-auth/middleware"

/* export function middleware(request: NextRequestWithAuth) {
    console.log("Request", request)
    //return NextResponse.redirect(new URL('/bu/mywork', request.url))
} */

/* export default withAuth(function middleware(request: NextRequestWithAuth) {
    const token = request.nextauth.token
    const url = request.url
    console.log("Token", token)
    console.log("URL", url)
    if (token && !url.includes("signin")) {
        const role = token.role
        if (role === "BU") {
            return NextResponse.redirect(new URL("/bu/template", request.url))
        } else if (role === "TELLER") {
            return NextResponse.redirect(new URL("/teller", request.url))
        } else {
            return NextResponse.redirect(new URL("/auth/login", request.url))
        }
    }
}) 

*/

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
