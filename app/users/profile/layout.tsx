import SideMenu from "@/components/SideMenu"
import React from "react"
import "@/app/users/administrator/(component)/CustomCss.css"
import ProviderAdmin from "@/app/users/administrator/(component)/provider/ProviderAdmin"
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
