"use client"
import React, { useState, memo } from "react"
import { Button, Popover } from "antd"
import { useRouter, useSearchParams } from "next/navigation"

function removeCharAt(str: string, index: number) {
    const firstPart = str.substring(0, index)
    const secondPart = str.substring(index + 1)
    const result = firstPart + secondPart
    return result
}
const condisonsParams = (
    key:
        | "creator"
        | "approved"
        | "status"
        | "product"
        | "timecreate"
        | "timeend",
    value: string
): string => {
    return value ? `&${key}=${encodeURIComponent(value)}` : ""
}
const params = ({
    creator,
    approved,
    status,
    product,
    timecreate,
    timeend
}: {
    creator: string
    approved: string
    status: string
    product: string
    timecreate: string
    timeend: string
}): string => {
    creator = condisonsParams("creator", creator)
    approved = condisonsParams("approved", approved)
    status = condisonsParams("status", status)
    product = condisonsParams("product", product)
    timecreate = condisonsParams("timecreate", timecreate)
    timeend = condisonsParams("timeend", timeend)
    const query = `?${creator}${approved}${status}${product}${timecreate}${timeend}`
    return removeCharAt(query, 1)
}
const ContenPopover: React.FC = () => {
    console.log(
        "test",
        params({
            creator: "5",
            approved: "123",
            status: "hoạt động",
            product: "4",
            timecreate: "6",
            timeend: "hoàng"
        })
    )

    return <></>
}
const Fillter: React.FC = () => {
    const [open, setOpen] = useState(false)

    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    return (
        <Popover
            destroyTooltipOnHide={true}
            content={<ContenPopover />}
            title="Bộ lọc"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button type="primary">Click me</Button>
        </Popover>
    )
}

export default memo(Fillter)
