"use client"
import { Flex } from "antd"
import React from "react"
import type { CollapseProps } from "antd"
import { Collapse } from "antd"
type Props = {
    ColLeft: React.ReactNode
    Button: React.ReactNode
    ColRight: React.ReactNode
    isCollapse?: boolean
    HiddenColLeft?: boolean
    isDisabled?: boolean
}
const LayoutTranfer: React.FC<Props> = ({
    ColLeft,
    Button,
    ColRight,
    isCollapse = true,
    HiddenColLeft,
    isDisabled
}) => {
    const Layout = (
        <Flex gap={10} style={{ position: "relative" }}>
            {isDisabled || (
                <div
                    className="absolute inset-0 rounded-lg  "
                    style={{
                        backgroundColor: " rgba(247, 246, 246, 0.5)",
                        zIndex: "99999"
                    }}
                ></div>
            )}
            {HiddenColLeft || (
                <>
                    <div className="w-full min-h-[300px]">{ColLeft}</div>
                    {Button}
                </>
            )}
            <div className="w-full min-h-[300px]">{ColRight}</div>
        </Flex>
    )
    const items: CollapseProps["items"] = [
        {
            key: "block",
            label: "Biểu mẫu",
            children: Layout
        }
    ]
    return (
        <>
            {isCollapse ? (
                <Collapse items={items} defaultActiveKey={["block"]} />
            ) : (
                Layout
            )}
        </>
    )
}
export default LayoutTranfer
