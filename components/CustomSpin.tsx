import { ConfigProvider, Spin, ThemeConfig } from "antd"

const theme: ThemeConfig = {
    components: {
        Spin: {
            colorPrimary: "white"
        }
    }
}

const CustomSpin = () => {
    return (
        <ConfigProvider theme={theme}>
            <div
                className="h-screen flex items-center justify-center"
                style={{
                    backgroundImage: `url(/img/background.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    //backgroundColor: "rgba(228, 240, 244, 1)",
                    width: "100vw"
                }}
            >
                <Spin size="large" />
            </div>
        </ConfigProvider>
    )
}

export default CustomSpin
