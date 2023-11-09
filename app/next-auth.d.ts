import "next-auth"
import { Users } from "./(types)/Users"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            session: string
            token: string
            userInfo: Users
            role: string
        } & DefaultSession["user"]
    }
    interface User {
        token: string
        session: string
    }
    interface Token {
        role: string
    }
}
