import { Permission } from "@/app/(types)/Permission"
import { Role } from "@/app/(types)/Role"
import { Users } from "@/app/(types)/Users"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
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

                    //console.log("User data", userInfo)

                    return userInfo
                } catch (error: any) {
                    /* console.log("Oh shit error", error.response)
                    return null */
                    throw new Error(error.response.data.message)
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ user, token }) => {
            //console.log("User", user)
            if (user) {
                const myUser = JSON.parse(JSON.stringify(user)) as Users
                const permission = myUser.permission as Permission[]

                let role = !FindPermission(permission, "children", "VisibleBU")
                    ? FindPermission(permission, "children", "VisibleTeller")
                        ? FindPermission(
                              permission,
                              "children",
                              "VisibleCVCTReviewer"
                          )
                            ? Role.KSVTELLER
                            : FindPermission(
                                  permission,
                                  "children",
                                  "VisibleBA"
                              )
                            ? Role.BA
                            : Role.TELLER
                        : Role.BU
                    : Role.BU

                if (FindPermission(permission, "children", "VisibleBA")) {
                    role = Role.BA
                }
                if (FindPermission(permission, "children", "VisibleAdmin")) {
                    role = Role.ADMIN
                }
                token.uid = user.token
                token.name = JSON.stringify(user)
                token.role = role
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                //session.user.session = token.name as string
                session.user.token = token.uid
                session.user.userInfo = JSON.parse(token.name!)
                session.user.role = token.role
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
        strategy: "jwt",
        maxAge: 30 * 60
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
        //signOut: '/auth/signout',
        //error: '/auth/error'
    }
}
