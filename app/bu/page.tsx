import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { Permission } from "../(types)/Permission"
import { FindPermission } from "../(utilities)/ArrayUtilities"
import { authOptions } from "../api/auth/authOptions"
const BUPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) return null

    const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) notFound()
    return <input placeholder="ok"></input>
}

export default BUPage
