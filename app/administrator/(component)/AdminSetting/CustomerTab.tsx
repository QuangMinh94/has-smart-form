"use client"
import React from "react"
import { Tabs } from "antd"
import SettingTheme from "./chidrenTab/SettingTheme"
const CustomerTab: React.FC = () => {
    const items = [
        {
            label: "SettingTheme",
            key: "SettingTheme",
            children: <SettingTheme />
        },
        {
            label: "SettingNotice",
            key: "SettingNotice",
            children: `Content of Tab SettingNotice `
        }
    ]
    return (
        <>
            <Tabs tabPosition="left" items={items} />
        </>
    )
}

export default CustomerTab
