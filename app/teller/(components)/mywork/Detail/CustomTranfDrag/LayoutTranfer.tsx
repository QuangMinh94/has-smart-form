"use client"
import React from "react"
type Props = {
    ColLeft: React.ReactNode
    Button: React.ReactNode
    ColRight: React.ReactNode
}
const LayoutTranfer: React.FC<Props> = ({ ColLeft, Button, ColRight }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {ColLeft}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 6px"
                }}
            >
                {Button}
            </div>
            {ColRight}
        </div>
    )
}
export default LayoutTranfer
