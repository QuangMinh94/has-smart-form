import SideMenu from "@/components/SideMenu"

import { cookies } from "next/headers"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import ProviderMyworkDetail from "@/app/teller/(components)/provider/ProviderMyworkDetail"
interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <ProviderMyworkDetail>
                <SideMenu>{children}</SideMenu>
            </ProviderMyworkDetail>
        </ClientCookiesProvider>
    )
}

export default BuLayout
