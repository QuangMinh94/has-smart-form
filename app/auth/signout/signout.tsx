"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignOut = () => {
    const router = useRouter()
    useEffect(() => {
        async function out() {
            await signOut({ redirect: false })
            router.push("/")
            router.refresh()
        }
        out()
    }, [])

    return <div>Sign out successfully</div>
}

export default SignOut
