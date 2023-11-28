import SideMenuTab from "../(component)/SideMenuTab"
import ProviderAdmin from "@/app/administrator/(component)/provider/ProviderAdmin"
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
