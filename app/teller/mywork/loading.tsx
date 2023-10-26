import { Spin } from "antd"
const Loading = () => {
    return (
        <Spin
            style={{ marginTop: "100px", display: "block", textAlign: "center" }}
            tip="Loading..."
            size="large"
        />
    )
}
export default Loading
