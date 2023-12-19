import { authOptions } from "@/app/api/auth/authOptions"
import { getServerSession } from "next-auth"
import { RedirectType, redirect } from "next/navigation"
const BUPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/signin", RedirectType.replace)
    }
}

export default BUPage
