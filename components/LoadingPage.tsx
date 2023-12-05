import { Spin } from "antd"
const Loading = () => {
    return (
        <Spin
            style={{
                marginTop: "100px",
                display: "block",
                textAlign: "center"
            }}
            tip="Loading..."
            size="large"
        >
            <div className="content" />
        </Spin>
    )
}
export default Loading
