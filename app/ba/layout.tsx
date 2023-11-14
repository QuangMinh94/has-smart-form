import React from "react"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
import SideMenu from "./(component)/SideMenu"
interface Props {
    children: React.ReactNode
}

const BaLayout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <SideMenu>{children}</SideMenu>
        </ClientCookiesProvider>
    )
}

export default BaLayout
