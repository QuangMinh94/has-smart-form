import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import ProviderBa from "@/app/users/ba/(component)/Provider"
import SideMenu from "@/components/SideMenu"
import ProviderTranfer from "@/components/provider/ProviderTranfer"
import { cookies } from "next/headers"
import React from "react"
interface Props {
    children: React.ReactNode
}

const BaLayout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <ProviderBa>
                <ProviderTranfer>
                    <SideMenu>{children}</SideMenu>
                </ProviderTranfer>
            </ProviderBa>
        </ClientCookiesProvider>
    )
}

export default BaLayout
