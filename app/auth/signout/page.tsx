"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignOutPage = async () => {
    const router = useRouter()
    await signOut({ redirect: false })
    router.push("/bu")
    return <div>Sign out successfully</div>
}

export default SignOutPage
