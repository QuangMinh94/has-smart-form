import type { ThemeConfig } from "antd"

const theme: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: "#0E7490"
        },
        Menu: {
            colorBgContainer: "#0E7490",
            itemColor: "white",
            itemHoverBg: "white"
        },
        Layout: {
            siderBg: "#0E7490"
        },
        Table: {
            headerBg: "#0E7490",
            headerColor: "white"
        }
    },
    token: {
        colorPrimary: "#0E7490"
    }
}

export default theme
