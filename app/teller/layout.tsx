import SideMenu from "./(components)/SideMenu"
import { ConfigProvider } from "antd"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
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
