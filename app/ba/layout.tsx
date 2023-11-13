import React from "react"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
interface Props {
    children: React.ReactNode
}

const BaLayout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            {/* <SideMenu title="Công việc của tôi">{children}</SideMenu> */}
        </ClientCookiesProvider>
    )
}

export default BaLayout
