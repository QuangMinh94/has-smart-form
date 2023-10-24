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
        /*  <div className="flex items-center"> */
        <Row align="middle">
            <Col span={11}>{ColLeft}</Col>
            <Col span={2}>
                <div
                    className="flex flex-col mx-6"
                    /*  style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 6px"
                    }} */
                >
                    {Button}
                </div>
            </Col>
            {/* <div
                    className="flex flex-col mx-6"
                     style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 6px"
                }}
                >
                    {Button}
                </div> */}
            <Col span={11}>{ColRight}</Col>
        </Row>
        /*  </div> */
    )
}
export default LayoutTranfer
