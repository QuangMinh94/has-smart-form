import { Permission } from "@/app/(types)/Permission"
import { authOptions } from "@/app/api/auth/authOptions"
import "@/app/users/administrator/(component)/CustomCss.css"
import ProviderAdmin from "@/app/users/administrator/(component)/provider/ProviderAdmin"
import SideMenu from "@/components/SideMenu"
import { getServerSession } from "next-auth"
import { redirect, RedirectType } from "next/navigation"
import React from "react"
type Props = {
    children: React.ReactNode
}

const LayoutAdmin = async ({ children }: Props) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission as Permission[]
    return (
        <ProviderAdmin>
            <SideMenu permission={permission}>{children}</SideMenu>
        </ProviderAdmin>
    )
}
export default LayoutAdmin
