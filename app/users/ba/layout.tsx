import React from "react"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
import SideMenu from "@/components/SideMenu"
import ProviderTranfer from "@/components/provider/ProviderTranfer"
import ProviderBa from "@/app/ba/(component)/Provider"
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
