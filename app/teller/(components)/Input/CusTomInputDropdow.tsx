"use client"
import React, { useState } from "react"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { Dropdown, Space, Input } from "antd"

const items: any = []

const App: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const { dataGlobal } = useContextMyWorkDetail()
    const dataMyWork = dataGlobal.dataMywork
    const HanderChange = (e: any) => {
        const mywork = dataMyWork.find(
            (item) => item.citizenId === e.target.value
        )
        if (mywork) {
            items.push({
                label: (
                    <div
                        onClick={(e) => {
                            console.log("mywork", mywork)
                        }}
                    >
                        {mywork.name}
                    </div>
                ),
                key: "mywork"
            })
        } else {
            items.lenght = 0
        }
    }
    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <Input />
        </Dropdown>
    )
}

export default App
