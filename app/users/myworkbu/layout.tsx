import { Permission } from "@/app/(types)/Permission"
import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import { authOptions } from "@/app/api/auth/authOptions"
import SideMenu from "@/components/SideMenu"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
import { PathParamsProvider } from "../(context)/provider"

interface Props {
    children: any
}

const BuLayout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission as Permission[]
    return (
        <PathParamsProvider>
            <ClientCookiesProvider value={cookies().getAll()}>
                <SideMenu permission={permission}>{children}</SideMenu>
            </ClientCookiesProvider>
        </PathParamsProvider>
    )
}

export default BuLayout
