import SideMenu from "./(components)/SideMenu"
import { ConfigProvider } from "antd"
import { ClientCookiesProvider } from "../ClientCookiesProvider"
import { cookies } from "next/headers"
interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    const priMaryColor = "#0E7490"
    
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: priMaryColor
                },
                components: {
                    Table: {
                        headerBg: priMaryColor,
                        headerColor: "white",
                        headerSortActiveBg: priMaryColor,
                        headerSortHoverBg: priMaryColor,
                        algorithm: true
                    }
                }
            }}
        >
            <ClientCookiesProvider value={cookies().getAll()}>
                <SideMenu title="Công việc của tôi">{children}</SideMenu>
            </ClientCookiesProvider>
        </ConfigProvider>
    )
}

export default BuLayout
