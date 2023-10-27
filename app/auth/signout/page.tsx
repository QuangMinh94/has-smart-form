"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignOutPage = async () => {
    const router = useRouter()
    useEffect(() => {
        async function out() {
            await signOut({ redirect: false })
            router.push("/bu")
        }
        out()
    }, [])

    return <div>Sign out successfully</div>
}

export default SignOutPage
