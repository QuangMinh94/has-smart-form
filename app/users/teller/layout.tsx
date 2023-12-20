import SideMenu from "@/components/SideMenu"

import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import ProviderMyworkDetail from "@/app/users/teller/(components)/provider/ProviderMyworkDetail"
import { cookies } from "next/headers"
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
