import SideMenu from "./(components)/SideMenu"
import { ConfigProvider } from "antd"
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
            <SideMenu title="Công việc của tôi">{children}</SideMenu>
        </ConfigProvider>
    )
}

export default BuLayout
