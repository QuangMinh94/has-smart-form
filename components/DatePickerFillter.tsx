"use client"
import React, { memo } from "react"
import dayjs from "dayjs"
import { DatePicker } from "antd"
const dateFormatList = ["DD/MM/YYYY"]
type PropsDatePiker = {
    defaultValue?: string
    onChange: (value: any) => void
}
const CustomerDatePiker: React.FC<PropsDatePiker> = ({
    defaultValue,
    onChange
}) => (
    <DatePicker
        style={{ width: "100%" }}
        presets={[
            { label: "Last 7 Days", value: dayjs().add(-7, "d") },
            { label: "Last 14 Days", value: dayjs().add(-14, "d") },
            { label: "Last 30 Days", value: dayjs().add(-30, "d") },
            { label: "Last 90 Days", value: dayjs().add(-90, "d") }
        ]}
        defaultValue={
            defaultValue ? dayjs(dayjs(defaultValue), "DD/MM/YYYY") : undefined
        }
        format={dateFormatList}
        onChange={(value) => {
            onChange(value?.toISOString() ?? "")
        }}
    />
)

export default memo(CustomerDatePiker)
