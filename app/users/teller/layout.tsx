import SideMenu from "@/components/SideMenu"

import { Permission } from "@/app/(types)/Permission"
import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderMyworkDetail from "@/app/users/teller/(components)/provider/ProviderMyworkDetail"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
interface Props {
    children: any
}

const TellerLayout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission as Permission[]

    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <ProviderMyworkDetail>
                <SideMenu permission={permission}>{children}</SideMenu>
            </ProviderMyworkDetail>
        </ClientCookiesProvider>
    )
}

export default TellerLayout
