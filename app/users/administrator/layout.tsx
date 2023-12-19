import "@/app/users/administrator/(component)/CustomCss.css"
import SideMenu from "@/components/SideMenu"
import React from "react"

type Props = {
    children: React.ReactNode
}
const LayoutAdmin = ({ children }: Props) => {
    return <SideMenu>{children}</SideMenu>
}
export default LayoutAdmin
