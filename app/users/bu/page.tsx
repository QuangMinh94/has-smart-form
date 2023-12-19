import { getServerSession } from "next-auth"
import { RedirectType, redirect } from "next/navigation"
import { authOptions } from "../api/auth/authOptions"
const BUPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/signin", RedirectType.replace)
    }
}

export default BUPage
