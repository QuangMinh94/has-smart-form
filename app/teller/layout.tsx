import SideMenu from "./(components)/SideMenu"

import { cookies } from "next/headers"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <SideMenu title="Công việc của tôi">{children}</SideMenu>
        </ClientCookiesProvider>
    )
}

export default BuLayout
