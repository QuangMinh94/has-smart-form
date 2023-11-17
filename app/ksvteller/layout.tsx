import SideMenu from "./(component)/SideMenu"

import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
interface Props {
    children: any
}

const Layout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <SideMenu title="Công việc của tôi">{children}</SideMenu>
        </ClientCookiesProvider>
    )
}

export default Layout
