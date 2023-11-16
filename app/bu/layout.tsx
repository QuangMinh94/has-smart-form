import { cookies } from "next/headers"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import SideMenu from "./SideMenu"
import { PathParamsProvider } from "./_context/provider"

interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    return (
        <PathParamsProvider>
            <ClientCookiesProvider value={cookies().getAll()}>
                <SideMenu level={process.env.PUBLIC_TEST!}>{children}</SideMenu>
            </ClientCookiesProvider>
        </PathParamsProvider>
    )
}

export default BuLayout
