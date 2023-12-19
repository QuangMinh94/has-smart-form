import { ClientCookiesProvider } from "@/app/ClientCookiesProvider"
import { cookies } from "next/headers"
import SideMenu from "./SideMenu"
import { PathParamsProvider } from "./_context/provider"

interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <PathParamsProvider>
            <ClientCookiesProvider value={cookies().getAll()}>
                <SideMenu level="">{children}</SideMenu>
            </ClientCookiesProvider>
        </PathParamsProvider>
    )
}

export default BuLayout
