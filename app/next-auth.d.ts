import "next-auth"
import { Users } from "./(types)/Users"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            session: string
            token: string
            userInfo: Users
        } & DefaultSession["user"]
    }
    interface User {
        token: string
        session: string
    }
    interface Token {
        token: string
        userInfo: Users
    }
}
