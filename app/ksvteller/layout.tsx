import SideMenu from "@/components/SideMenu"
import ProviderMyworkDetail from "@/app/teller/(components)/provider/ProviderMyworkDetail"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
interface Props {
    children: any
}

const Layout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <ProviderMyworkDetail>
                <SideMenu>{children}</SideMenu>
            </ProviderMyworkDetail>
        </ClientCookiesProvider>
    )
}

export default Layout
