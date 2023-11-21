import { ConfigProvider, Spin, ThemeConfig } from "antd"
import { CSSProperties } from "react"

const defaultTheme: ThemeConfig = {
    components: {
        Spin: {
            colorPrimary: "white"
        }
    }
}

const CustomSpin = ({
    noImage,
    theme
}: {
    noImage: boolean
    theme?: ThemeConfig
}) => {
    const imageStyle: CSSProperties = {
        backgroundImage: `url(/img/background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        //backgroundColor: "rgba(228, 240, 244, 1)",
        width: "100vw"
    }

    return (
        <ConfigProvider theme={theme ? theme : defaultTheme}>
            <div
                className="h-screen flex items-center justify-center"
                style={noImage ? {} : imageStyle}
            >
                <Spin size="large" />
            </div>
        </ConfigProvider>
    )
}

export default CustomSpin
