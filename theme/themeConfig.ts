import type { ThemeConfig } from "antd"

const theme: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: "#0E7490"
        },
        Menu: {
            /* itemBg: "black" */
            /* itemColor: "white",
            itemHoverBg: "white", 
            itemSelectedColor: "black",
            itemSelectedBg: "black"*/
            /* horizontalItemSelectedBg: "black",
            horizontalItemSelectedColor: "black" */
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
        },
        Avatar: {
            colorBgContainer: "black"
        }
    },
    token: {
        colorPrimary: "#0E7490"
    }
}

export default theme
