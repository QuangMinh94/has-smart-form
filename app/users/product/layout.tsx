import { Permission } from "@/app/(types)/Permission"
import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderBa from "@/app/users/(components)/provider/ProviderProduct"
import SideMenu from "@/components/SideMenu"
import ProviderTranfer from "@/components/provider/ProviderTranfer"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
import React from "react"
interface Props {
    children: React.ReactNode
}

const BaLayout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission as Permission[]
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <ProviderBa>
                <ProviderTranfer>
                    <SideMenu permission={permission}>{children}</SideMenu>
                </ProviderTranfer>
            </ProviderBa>
        </ClientCookiesProvider>
    )
}

export default BaLayout
