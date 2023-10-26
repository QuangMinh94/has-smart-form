import axios from "axios"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "enter username"
                },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req) {
                //console.log("Credentials", credentials)
                if (!credentials?.username || !credentials?.password)
                    return null

                try {
                    //call credential service to get token and session
                    const user = await axios.post(process.env.AUTH_LOGIN!, {
                        username: credentials?.username,
                        password: credentials?.password
                    })

                    if (!user.data) return null
                    cookies().set("token", user.data.token)
                    cookies().set("session", user.data.session)

                    console.log("User data", user.data)

                    return user.data
                } catch (error) {
                    console.log("Oh shit error", error)
                    return null
                }
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.session = token.name as string
                session.user.token = token.uid
            }
            return session
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.token
                token.name = user.session
            }
            return token
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
        //signOut: '/auth/signout',
        //error: '/auth/error'
    }
}
