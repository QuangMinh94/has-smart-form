import SideMenu from "@/components/SideMenu"
import React from "react"
import "@/app/administrator/(component)/CustomCss.css"

type Props = {
    children: React.ReactNode
}
const LayoutAdmin = ({ children }: Props) => {
    return <SideMenu>{children}</SideMenu>
}
export default LayoutAdmin
