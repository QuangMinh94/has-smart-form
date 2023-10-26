"use client"

import { signOut } from "next-auth/react"

const SignOutPage = () => {
    signOut({
        redirect: true,
        callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL! + "/bu"
    })
    return <div>Sign out successfully</div>
}

export default SignOutPage
