"use client"
import { Col, Row } from "antd"
import React from "react"
type Props = {
    ColLeft: React.ReactNode
    Button: React.ReactNode
    ColRight: React.ReactNode
}
const LayoutTranfer: React.FC<Props> = ({ ColLeft, Button, ColRight }) => {
    return (
       
        <Row align="middle">
            <Col span={11}>{ColLeft}</Col>
            <Col span={2}>
                <div
                    className="flex flex-col mx-6"
                >
                    {Button}
                </div>
            </Col>
            <Col span={11}>{ColRight}</Col>
        </Row>
    )
}
export default LayoutTranfer
