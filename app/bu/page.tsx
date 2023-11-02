import { getServerSession } from "next-auth"
import { RedirectType, redirect } from "next/navigation"
import { authOptions } from "../api/auth/authOptions"
const BUPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/signin", RedirectType.replace)
    }

    /*   const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) {
        if (!FindPermission(permission, "children", "VisibleTeller")) {
            notFound()
        } else {
            redirect("/teller", RedirectType.replace)
        }
    } else {
        redirect("/bu/template", RedirectType.replace)
    } */
}

export default BUPage
