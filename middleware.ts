export { default } from "next-auth/middleware"
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/bu/mywork', request.url))
//   }
export const config = {
    matcher: ["/dashboard", "/bu/:path*"]
}
