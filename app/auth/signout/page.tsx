import { signOut } from "next-auth/react"

const SignOutPage = async () => {
    await signOut({ callbackUrl: "http://localhost:3000/bu" })
    return <div>Sign out successfully</div>
}

export default SignOutPage
