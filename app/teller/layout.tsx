import SideMenu from "./(components)/SideMenu"
import { ConfigProvider } from "antd"
interface Props {
    children: any
}

const BuLayout = ({ children }: Props) => {
    const priMaryColor = "#0e7490"

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
                    },
                    // Button: {
                    //   colorPrimary: '#00b96b',
                    //   algorithm: true, // Enable algorithm
                    // },
                    Input: {
                        hoverBorderColor: priMaryColor,
                        algorithm: true // Enable algorithm
                    }
                    // Menu: {
                    //     colorPrimary: '#1375b1',

                    //     algorithm: true,
                    // }
                }
            }}
        >
            <SideMenu title="Công việc của tôi">{children}</SideMenu>
        </ConfigProvider>
    )
}

export default BuLayout
