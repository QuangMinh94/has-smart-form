import SideMenu from "@/components/SideMenu"
import React from "react"
import "@/app/administrator/(component)/CustomCss.css"
import ProviderAdmin from "@/app/administrator/(component)/provider/ProviderAdmin"
type Props = {
    children: React.ReactNode
}

const LayoutAdmin = async ({ children }: Props) => {
    return (
        <ProviderAdmin>
            <SideMenu>{children}</SideMenu>
        </ProviderAdmin>
    )
}
export default LayoutAdmin
