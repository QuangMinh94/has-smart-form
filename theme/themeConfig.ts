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
            headerColor: "white",
            headerSortActiveBg: "#0E7490",
            headerSortHoverBg: "#0E7490",
            algorithm: true
        },
        Form: {
            labelRequiredMarkColor: "#991B1B",
            colorError: "#991B1B",
            itemMarginBottom: 1
        }
    },
    token: {
        colorPrimary: "#0E7490",
        colorTextPlaceholder: "white"
    }
}

export default theme
