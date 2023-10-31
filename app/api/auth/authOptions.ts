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

                    //get user and save to user id
                    const userResponse = await axios.get(
                        process.env.GET_USER_ID!,
                        {
                            headers: {
                                Authorization: "Bearer " + user.data.token,
                                Session: user.data.session
                            }
                        }
                    )
                    const userInfo = userResponse.data

                    //console.log("User data", user.data)

                    return userInfo
                } catch (error) {
                    console.log("Oh shit error", error)
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ user, token }) => {
            //console.log("User", user)
            if (user) {
                token.uid = user.token
                token.name = JSON.stringify(user)
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                //session.user.session = token.name as string
                session.user.token = token.uid
                session.user.userInfo = JSON.parse(token.name!)
            }
            return session
        }
        /*   redirect: ({ url, baseUrl }) => {
            // Allows relative callback URLs
            console.log("Url where", url)
            console.log("Da fuck is baseurl ", baseUrl)
            return baseUrl
        } */
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
