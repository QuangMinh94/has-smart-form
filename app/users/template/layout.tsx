import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import SideMenu from "@/components/SideMenu"
import { cookies } from "next/headers"
import { PathParamsProvider } from "../(context)/provider"

interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <PathParamsProvider>
            <ClientCookiesProvider value={cookies().getAll()}>
                <SideMenu>{children}</SideMenu>
            </ClientCookiesProvider>
        </PathParamsProvider>
    )
}

export default BuLayout
