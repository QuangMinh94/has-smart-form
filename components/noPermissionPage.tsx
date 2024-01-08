import React from "react"
import { Result } from "antd"

const NoPermssionPage: React.FC = () => {
    return (
        <Result
            status="error"
            title="Bạn không có quyền để vào trang này"
        ></Result>
    )
}

export default NoPermssionPage
