"use client"
import React from "react"
import { theme } from "antd"
type Props = {
    content: string
    onClick: () => {}
}
const ButtonApprove: React.FC<Props> = ({ content, onClick }) => {
    const {
        token: { colorPrimary }
    } = theme.useToken()

    return (
        <div
            onClick={onClick}
            className="font-semibold cursor-pointer hover:brightness-150"
            style={{ color: colorPrimary }}
        >
            {content}
        </div>
    )
}
export default ButtonApprove
