"use client"
import { Flex } from "antd"
import React from "react"
import type { CollapseProps } from "antd"
import { Collapse } from "antd"
type Props = {
    ColLeft: React.ReactNode
    Button: React.ReactNode
    ColRight: React.ReactNode
}
const LayoutTranfer: React.FC<Props> = ({ ColLeft, Button, ColRight }) => {
    const items: CollapseProps["items"] = [
        {
            key: "block",
            label: "Biểu mẫu",
            children: (
                <Flex gap={10}>
                    <div className="w-full min-h-[300px]">{ColLeft}</div>
                    {Button}
                    <div className="w-full min-h-[300px]">{ColRight}</div>
                </Flex>
            )
        }
    ]
    return (
        // <>
        //     <Flex gap={10}>
        //         <div className="w-full min-h-[300px]">{ColLeft}</div>
        //         {Button}
        //         <div className="w-full min-h-[300px]">{ColRight}</div>
        //     </Flex>
        // </>
        <Collapse items={items} defaultActiveKey={["block"]} />
    )
}
export default LayoutTranfer
