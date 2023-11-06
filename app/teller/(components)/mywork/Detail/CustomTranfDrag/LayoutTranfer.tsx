"use client"
import { Flex } from "antd"
import React from "react"
type Props = {
    ColLeft: React.ReactNode
    Button: React.ReactNode
    ColRight: React.ReactNode
}
const LayoutTranfer: React.FC<Props> = ({ ColLeft, Button, ColRight }) => {
    return (
        <>
            <Flex gap={10}>
                <div className="w-full min-h-[300px]">{ColLeft}</div>
                {Button}
                <div className="w-full min-h-[300px]">{ColRight}</div>
            </Flex>
            {/*  <Row>
                <Col span={11} className="min-h-[300px]">
                    {ColLeft}
                </Col>
                <Col span={2}>
                    <div className="flex flex-col justify-center mx-6">
                        {Button}
                    </div>
                </Col>
                <Col span={11} className="min-h-[300px]">
                    {ColRight}
                </Col>
            </Row> */}
        </>
    )
}
export default LayoutTranfer
