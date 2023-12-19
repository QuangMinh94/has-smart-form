import ProviderAdmin from "@/app/users/administrator/(component)/provider/ProviderAdmin"
import SideMenuTab from "../(component)/SideMenuTab"

import React from "react"
type Props = {
    children: React.ReactNode
}
const LayoutTab = ({ children }: Props) => {
    return (
        <SideMenuTab>
            <ProviderAdmin> {children}</ProviderAdmin>
        </SideMenuTab>
    )
}
export default LayoutTab
