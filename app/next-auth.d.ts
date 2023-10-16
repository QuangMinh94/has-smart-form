import "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            session: string
            token: string
        } & DefaultSession["user"]
    }
    interface User {
        token: string
        session: string
    }
}
